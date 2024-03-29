from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from google.generativeai import configure, GenerativeModel

from ml import predict_disease, get_related_symptoms, train_model, get_all_symptoms, precautionDictionary
from firebase_functions import *

gemini_api_key = "xxx"
configure(api_key = gemini_api_key)

generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 120,
}
safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
]

model = GenerativeModel('gemini-pro', generation_config=generation_config, safety_settings=safety_settings)
chat_history = []

def getHistory(uid):
    return getHistoryFromDatabase(uid)

def setHistory(uid, history):
    return setHistoryInDatabase(uid, history)

app = Flask(__name__)
CORS(app)

@app.route("/")
def root():
    return "/"

@app.route("/sabz")
def symptoms():
    return "sabz"

@app.route("/meta")
def meta():
    return "id: gemini chat & journal"

@app.route("/predict", methods=["GET"])
def predictGET():
    return predict_disease(["muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts"])
    

@app.route("/predict", methods=["POST"])     # give list of symptoms using post body and get predicted disease
def predict():
    try:
        return predict_disease(list(request.data.decode("UTF-8").replace("[", "").replace("]", "").replace(" ", "").replace('"', '').split(",")))
    except KeyError:
        return Response("[key error]", status=201)

@app.route("/get_prec", methods=["POST"])
def get_precautions():
    print(request.data.decode("UTF-8")); 
    precautions = []

    for disease in (list(request.data.decode("UTF-8").replace("[", "").replace("]", "").replace('"', '').split(","))):
        precautions.append(precautionDictionary[disease])

    return precautions


@app.route("/get_prec", methods=["GET"])
def get_precautionsGET():
    diseases = ["AIDS", "Acne"]
    precautions = []
    for disease in diseases:
        precautions.append(precautionDictionary[disease])

    return precautions


@app.route("/get_related_syms")
def get_related_syms():
    related_symptoms = get_related_symptoms(request.args.get("s"))
    return list(related_symptoms)

@app.route("/get_all_syms")
def get_all_syms():
    return list(get_all_symptoms())


@app.route("/chat", methods=["POST"])
def chat():

    payload = request.get_json();
    message = payload["message"]
    name = payload["name"]
    uid = payload["uid"]

    print(f"{name} is saying {message}.")

    response = sendToChat(message, name, uid)

    return jsonify({'message': response})



@app.route("/generate_gemini_response", methods=["POST"])
def generateGeminiResponse():
    payload = request.get_json();
    message = payload["message"]
    name = payload["name"]

    query = f'''
        You are now a virtual healthcare assistant named Niya. You can predict illnesses based on symptoms,
        you are a web app with various features such as a Journal for mental health etc.
        Answer questions like a human friend. You are female.
        Please do not ask 'what can i help you with' or similar phrases.
        Be natural, don't overdo the assistant part. Be a friend.
        Include a few emojis here and there.
        Your responses should be short, please do not exceed 120 characters.
        Don't mention or reference the user with a gender. Always use gender neutral words or user's name,
        Answer the questions the user asks with the above context.
        User's name: {name}

        User: {message}
    '''

    response = model.generate_content(query)

    return jsonify({'message': response.text})


def sendToChat(message, name, uid):
    print("Sending to chat.")
    history = getHistory(uid)
    print("User history:")
    print(history)
    print("----------------- history end.")

    context = f'''
        You are now a virtual healthcare assistant named Niya. You can predict illnesses based on symptoms,
        you are a web app with various features such as a Journal for mental health etc.
        Answer questions like a human friend. You are female.
        Please do not ask 'what can i help you with' or similar phrases.
        Be natural, don't overdo the assistant part. Be a friend.
        Include a few emojis here and there.
        Your responses should be short, please do not exceed 120 characters.
        Don't mention or reference the user with a gender. Always use gender neutral words or user's name,
        Answer the questions the user asks with the above context.
        User's name: {name}
    '''
    chat = model.start_chat(history=[])

    if (history is None):
        print("Sending context because history is empty.")
        chat.send_message(context)

    response = chat.send_message(message)

    print("Updating history.")
    setHistory(uid, chat.history)
    print("--------------------- history updated.")

    

    if (response.prompt_feedback.block_reason == 0):
        return (response.candidates[0].content.parts[0].text)
    else:
        print("----------------------------------")
        print(response.prompt_feedback.block_reason)
        print("----------------------------------")
        return "error gemini block"

@app.route("/diary_entry")
def diary_entry():
    payload = request.get_json();
    text = payload["text"]
    uid = payload["uid"]

    query = f'''
        The user is writing a diary entry.
        You don't have to respond to this message. But this diary entry is very important.
        The user might ask questions based on this diary entry.
        This diary entry was added on January 29, 2024  6PM.

        Diary entry: {text}
    '''
    history = getHistory(uid)
    chat = model.start_chat(history=history)

    if (history is None):
        print("Sending context because history is empty.")
        chat.send_message(context)

    response = chat.send_message(message)
    setHistory(uid, chat.history)

if __name__ == "__main__":
    print("Flask app running")
    app.run()
    # sendToChat("how are you", "sabari")
    # sendToChat("what is my name", "sabari")


