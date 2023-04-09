from flask import Flask, request
from flask_cors import CORS

from ml import predict_disease, get_related_symptoms, train_model, get_all_symptoms


app = Flask(__name__)
CORS(app)

@app.route("/")
def root():
    return "/"

@app.route("/sabz")
def symptoms():
    return "sabz"

@app.route("/predict", methods=["GET"])
def predictGET():
    return predict_disease(["muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts"])
    

@app.route("/predict", methods=["POST"])     # give list of symptoms using post body and get predicted disease
def predict():
    # return predict_disease(['burning_micturition', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine'])
    print(type(request.data.decode("UTF-8")))

    print(list(request.data.decode("UTF-8").replace("[", "").replace("]", "").replace(" ", "").split(",")))

    return predict_disease(list(request.data.decode("UTF-8").replace("[", "").replace("]", "").replace(" ", "").replace('"', '').split(",")))

@app.route("/get_related_syms")     # URL/get_related_syms?s=vomiting    - s is the symptom query param
def get_related_syms():
    related_symptoms = get_related_symptoms(request.args.get("s"))
    return list(related_symptoms)

@app.route("/get_all_syms")
def get_all_syms():
    return list(get_all_symptoms())

if __name__ == "__main__":
    print("Flask app running")
    app.run(debug=True)

