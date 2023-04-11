

import requests
import threading
import pandas


training = pandas.read_csv("./datasets/Training.csv")

symptoms = training.iloc[0:1, 0:-1]

threads = []

def sendReq(symptom):
	res = requests.get(f"http://localhost:5000/get_related_syms?s={symptom}")
	print(f"{symptom} - {res.json()}")

for symptom in ["muscle_wasting", "chills"]:
	t = threading.Thread(target=lambda: sendReq(symptom))
	threads.append(t)
	t.daemon = True
	t.start()
	print("Starting thread.")


for thread in threads:
	thread.join()
	print("Joining thread.")
