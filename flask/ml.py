import pandas as pd
import numpy as np
import pickle 
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, _tree
import joblib
import os
from time import perf_counter as pc

basedir = os.path.abspath(os.path.dirname(__file__))


severityDictionary = dict()
description_list = dict()
precautionDictionary = {'Drug Reaction': ['stop irritation', 'consult nearest hospital', 'stop taking drug', 'follow up'], 'Malaria': ['Consult nearest hospital', 'avoid oily food', 'avoid non veg food', 'keep mosquitos out'], 'Allergy': ['apply calamine', 'cover area with bandage', '', 'use ice to compress itching'], 'Hypothyroidism': ['reduce stress', 'exercise', 'eat healthy', 'get proper sleep'], 'Psoriasis': ['wash hands with warm soapy water', 'stop bleeding using pressure', 'consult doctor', 'salt baths'], 'GERD': ['avoid fatty spicy food', 'avoid lying down after eating', 'maintain healthy weight', 'exercise'], 'Chronic cholestasis': ['cold baths', 'anti itch medicine', 'consult doctor', 'eat healthy'], 'hepatitis A': ['Consult nearest hospital', 'wash hands through', 'avoid fatty spicy food', 'medication'], 'Osteoarthristis': ['acetaminophen', 'consult nearest hospital', 'follow up', 'salt baths'], '(vertigo) Paroymsal  Positional Vertigo': ['lie down', 'avoid sudden change in body', 'avoid abrupt head movment', 'relax'], 'Hypoglycemia': ['lie down on side', 'check in pulse', 'drink sugary drinks', 'consult doctor'], 'Acne': ['bath twice', 'avoid fatty spicy food', 'drink plenty of water', 'avoid too many products'], 'Diabetes ': ['have balanced diet', 'exercise', 'consult doctor', 'follow up'], 'Impetigo': ['soak affected area in warm water', 'use antibiotics', 'remove scabs with wet compressed cloth', 'consult doctor'], 'Hypertension ': ['meditation', 'salt baths', 'reduce stress', 'get proper sleep'], 'Peptic ulcer diseae': ['avoid fatty spicy food', 'consume probiotic food', 'eliminate milk', 'limit alcohol'], 'Dimorphic hemmorhoids(piles)': ['avoid fatty spicy food', 'consume witch hazel', 'warm bath with epsom salt', 'consume alovera juice'], 'Common Cold': ['drink vitamin c rich drinks', 'take vapour', 'avoid cold food', 'keep fever in check'], 'Chicken pox': ['use neem in bathing ', 'consume neem leaves', 'take vaccine', 'avoid public places'], 'Cervical spondylosis': ['use heating pad or cold pack', 'exercise', 'take otc pain reliver', 'consult doctor'], 'Hyperthyroidism': ['eat healthy', 'massage', 'use lemon balm', 'take radioactive iodine treatment'], 'Urinary tract infection': ['drink plenty of water', 'increase vitamin c intake', 'drink cranberry juice', 'take probiotics'], 'Varicose veins': ['lie down flat and raise the leg high', 'use oinments', 'use vein compression', 'dont stand still for long'], 'AIDS': ['avoid open cuts', 'wear ppe if possible', 'consult doctor', 'follow up'], 'Paralysis (brain hemorrhage)': ['massage', 'eat healthy', 'exercise', 'consult doctor'], 'Typhoid': ['eat high calorie vegitables', 'antiboitic therapy', 'consult doctor', 'medication'], 'Hepatitis B': ['consult nearest hospital', 'vaccination', 'eat healthy', 'medication'], 'Fungal infection': ['bath twice', 'use detol or neem in bathing water', 'keep infected area dry', 'use clean cloths'], 'Hepatitis C': ['Consult nearest hospital', 'vaccination', 'eat healthy', 'medication'], 'Migraine': ['meditation', 'reduce stress', 'use poloroid glasses in sun', 'consult doctor'], 'Bronchial Asthma': ['switch to loose cloothing', 'take deep breaths', 'get away from trigger', 'seek help'], 'Alcoholic hepatitis': ['stop alcohol consumption', 'consult doctor', 'medication', 'follow up'], 'Jaundice': ['drink plenty of water', 'consume milk thistle', 'eat fruits and high fiberous food', 'medication'], 'Hepatitis E': ['stop alcohol consumption', 'rest', 'consult doctor', 'medication'], 'Dengue': ['drink papaya leaf juice', 'avoid fatty spicy food', 'keep mosquitos away', 'keep hydrated'], 'Hepatitis D': ['consult doctor', 'medication', 'eat healthy', 'follow up'], 'Heart attack': ['call ambulance', 'chew or swallow asprin', 'keep calm', ''], 'Pneumonia': ['consult doctor', 'medication', 'rest', 'follow up'], 'Arthritis': ['exercise', 'use hot and cold therapy', 'try acupuncture', 'massage'], 'Gastroenteritis': ['stop eating solid food for while', 'try taking small sips of water', 'rest', 'ease back into eating'], 'Tuberculosis': ['cover mouth', 'consult doctor', 'medication', 'rest'], 'Covid': ['cover mouth', 'social distancing', 'wear mask', 'medication']}
condition = ''
precaution_list = []
predicted_disease = ''
predicted_disease_description = ''
predicted_disease_description2 = ''
symptoms_given = []
present_disease = ''
symptoms_exp = []
yes_or_no = []
le = ''
reduced_data = []
precaution_list2 = ''
color = ''


GLOBALS = {}

def path(path):
    print(os.path.join(basedir, path))
    return os.path.join(basedir, path)

def GLOBAL_STORE(dic):
    GLOBALS.update(dic)

def get_label_encoder():
    return GLOBALS["le"]

def get_reduced_data():
    return GLOBALS["reduced_data"]

def list_to_string(mylist):
    mystring = ""
    for item in mylist:
        mystring += item.replace('_', ' ') + ', '
    mystring = mystring[:-2]
    return mystring

def getPrecautonForDisease(disease):
    return precautionDictionary[disease]


def getDicts():
    global description_list
    global severityDictionary
    global precautionDictionary


    with open(path("datasets/symptom_Description.csv")) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            _description = {row[0]: row[1]}
            description_list.update(_description)


    with open(path("datasets/symptom_severity.csv")) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            _diction = {row[0]: int(row[1])}
            severityDictionary.update(_diction)


    with open(path("datasets/symptom_precaution.csv")) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            _prec = {row[0]: [row[1], row[2], row[3], row[4]]}
            precautionDictionary.update(_prec)


#! ====================
symptom_severity_df = pd.read_csv(path("datasets/symptom_severity.csv"))
training_df = pd.read_csv(path("datasets/Training.csv"))


def get_all_symptoms():
    symptom_list = symptom_severity_df['itching'].tolist()
    symptom_list.append('itching')
    symptom_list.remove('prognosis')
    # symptom_list = df.iloc[:,0:1]
    symptoms_spaced = []
    for symptom in symptom_list:
        symptoms_spaced.append(symptom.replace('_',' '))
    symptoms_dict = dict(zip(symptoms_spaced, symptom_list))
    # return symptom_list, symptoms_spaced, symptoms_dict
    return symptom_list


def calc_condition(symptoms_experienced, days):
    # print("calc_condition called")
    sum = 0
    for item in symptoms_experienced:
        sum = sum+severityDictionary[item]
    if((sum*days)/(len(symptoms_experienced)+1) > 13):
        condition1 = "You should take the consultation from doctor."
        color1 = '#c0392b'
    else:
        condition1 = "It might not be that bad but you should take precautions."
        color1 = '#c9710e'

    return condition1,color1

def check_pattern(dis_list, inp):
    # print(f"First symptom: {inp}")
    # print("------------------------------------------------------")
    print("\n")
    import re
    pred_list = []
    ptr = 0
    patt = "^" + inp + "$"
    regexp = re.compile(inp)
    for item in dis_list:

        if regexp.search(item):
            pred_list.append(item)
            # return 1,item
    if(len(pred_list) > 0):
        return 1, pred_list
    else:
        return ptr, dis_list


def print_disease(node):
    # print("print_disease called")
    le = get_label_encoder()
    node = node[0]
    val = node.nonzero()
    disease = le.inverse_transform(val[0])
    return disease


def tree_to_code(tree, feature_names, symptom1):
    # print("tree_to_code called")
    global condition
    global symptoms_given
    tree_ = tree.tree_
    feature_name = [
        feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!"
        for i in tree_.feature
    ]

    chk_dis = ",".join(feature_names).split(",")
    symptoms_present = []

    while True:
        conf, cnf_dis = check_pattern(chk_dis, symptom1)
        if conf == 1:
            conf_inp = 0
            disease_input = cnf_dis[conf_inp]
            break

    def recurse(node, depth):
        # print("recurse called")
        global condition
        global present_disease
        global precaution_list
        global predicted_disease
        global predicted_disease_description
        global predicted_disease_description2
        global symptoms_given
        global reduced_data
        symptoms_given = []
        indent = "  " * depth
        if tree_.feature[node] != _tree.TREE_UNDEFINED:
            name = feature_name[node]
            threshold = tree_.threshold[node]

            if name == disease_input:
                val = 1
            else:
                val = 0
            if val <= threshold:
                recurse(tree_.children_left[node], depth + 1)
            else:
                symptoms_present.append(name)
                recurse(tree_.children_right[node], depth + 1)
        else:
            present_disease = print_disease(tree_.value[node])
            reduced_data = get_reduced_data()
            red_cols = reduced_data.columns
            symptoms_given = red_cols[reduced_data.loc[present_disease].values[0].nonzero()]

    recurse(0, 1)
    return symptoms_given


def get_related_symptoms(symptom1):
    global le
    global reduced_data
    
    clf = retrieve_model()
    clf = clf[0]

    if (symptom1 not in training_df.iloc[0:1, 0:-1]):
        print(f"Received an invalid symptom - {symptom1}. Returning invalid sym as response.")
        return "invalid sym"

    cols = training_df.columns[:-1]
    y = training_df['prognosis']

    reduced_data = training_df.groupby(training_df['prognosis']).max()
    le = preprocessing.LabelEncoder()
    le.fit(y)

    GLOBAL_STORE( { "le": le, "reduced_data": reduced_data } )


    symptoms_given = tree_to_code(clf, cols, symptom1)
    return symptoms_given

def train_model():
	X = training_df.iloc[:, :-1]
	y = training_df['prognosis']
	X_train, X_test, y_train, y_test = train_test_split(
	X, y, test_size=0.3, random_state=20)
	rf_clf = DecisionTreeClassifier()
	rf_clf.fit(X_train, y_train)

	return rf_clf, X


def dump_model():
    print("Beginning training.")
    model, X = train_model();
    print("Training complete.")

    print("Beginning dumping.")
    joblib.dump(model, "model_save.pkl")
    print("Dumping complete.")


def retrieve_model():
    X = training_df.iloc[:, :-1]
    model = joblib.load(path("model_save.pkl"))
    return model, X

def predict(symptoms_exp):
        # print(f"Symptoms experienced: {list_to_string(symptoms_exp)}")


        trained_model, X = retrieve_model()
        # print(X)

        symptoms_dict = {}

        for index, symptom in enumerate(X):
            symptoms_dict[symptom] = index

        input_vector = np.zeros(len(symptoms_dict))
        for item in symptoms_exp:
            input_vector[[symptoms_dict[item]]] = 1

        return list(trained_model.predict([input_vector]))


def predict_disease(symptoms_arr: list) -> list:
    # ts = pc()
    predicted_disease = predict(symptoms_arr)
    # te = pc()

    # print(te - ts)
    # print("----------------------")
    # print(type(present_disease))
    # print(type(predicted_disease))
    # print(f"First prediction: {present_disease}, Second prediction: {predicted_disease}")
    # print("----------------------")

    predicted_disease.append(present_disease[0])
    # print("-------")
    # print(predicted_disease)

    return list(predicted_disease)