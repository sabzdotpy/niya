from flask import Flask, request
from ml import predict_disease, get_related_symptoms, train_model


app = Flask(__name__)

@app.route("/")
def root():
    return "/"

@app.route("/sabz")
def symptoms():
    return "sabz"

@app.route("/predict", methods=["GET", "POST"])     # give list of symptoms using post body and get predicted disease
def predict():
    # return predict_disease(['burning_micturition', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine'])
    return predict_disease(["muscle_wasting", "patches_in_throat", "high_fever", "extra_marital_contacts"])

@app.route("/get_related_syms")     # URL/get_related_syms?s=vomiting    - s is the symptom query param
def get_related_syms():
    related_symptoms = get_related_symptoms(request.args.get("s"))
    return list(related_symptoms)


if __name__ == "__main__":
    print("Flask app running")
    app.run(debug=True)

