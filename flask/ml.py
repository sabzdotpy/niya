import pandas as pd
import numpy as np
import pickle 
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, _tree
import joblib
import os
import sys
from time import perf_counter as pc

basedir = os.path.abspath(os.path.dirname(__file__))

sys.setrecursionlimit(200)

severityDictionary = dict()
description_list = dict()
precautionDictionary = dict()
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

def GLOBAL_STORE(dic):
    print('----------------------------------->')
    print(f"Global Storage changing...")
    print(dic)
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

def check_pattern(dis_list, inp):
    print(f"First symptom: {inp}")
    print("------------------------------------------------------")
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
    print("print_disease called")
    le = get_label_encoder()
    node = node[0]
    val = node.nonzero()
    disease = le.inverse_transform(val[0])
    return disease


def tree_to_code(tree, feature_names, symptom1):
    print("tree_to_code called")
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
        print("recurse called")
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
    
    clf = retrieve_model()  # decision tree classifier model
    clf = clf[0]


    training = pd.read_csv(f'./datasets/Training.csv')

    if (symptom1 not in training.iloc[0:1, 0:-1]):
        return "invalid sym"

    cols = training.columns[:-1]
    y = training['prognosis']

    reduced_data = training.groupby(training['prognosis']).max()
    le = preprocessing.LabelEncoder()
    le.fit(y)

    GLOBAL_STORE( { "le": le, "reduced_data": reduced_data } )


    symptoms_given = tree_to_code(clf, cols, symptom1)
    return symptoms_given

def train_model():
	df = pd.read_csv(f'./datasets/Training.csv')
	X = df.iloc[:, :-1]
	y = df['prognosis']
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
    df = pd.read_csv('D:/code/Python/PredictIt/myproject/datasets/Training.csv')
    X = df.iloc[:, :-1]
    model = joblib.load("model_save.pkl")

    return model, X

def predict(symptoms_exp):
        print(f"Symptoms experienced: {list_to_string(symptoms_exp)}")


        trained_model, X = retrieve_model()
        print(X)

        symptoms_dict = {}

        for index, symptom in enumerate(X):
            symptoms_dict[symptom] = index

        input_vector = np.zeros(len(symptoms_dict))
        for item in symptoms_exp:
            input_vector[[symptoms_dict[item]]] = 1

        return list(trained_model.predict([input_vector]))


def predict_disease(symptoms_arr):
    ts = pc()
    predicted_disease = predict(symptoms_arr)
    te = pc()

    print(te - ts)
    return predicted_disease

"""

after giving first symptom - train()
call check_pattern
call recurse() - gives possible related symptoms in /symptoms
after getting possible related symptoms - call train() again
call recurse()
call print_disease()
call getDicts()
call recurse2() once
call sec_predict()
# call get_symptoms_list()
call list_to_string()

"""