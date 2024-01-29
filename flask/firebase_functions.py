import firebase_admin
from firebase_admin import credentials, auth
from firebase_admin import db
from datetime import datetime, timezone
from json import dumps

import os
dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'admin_sdk.json')

cred = credentials.Certificate(filename)
firebase_admin.initialize_app(
    cred, {"databaseURL": "https://niya-web-default-rtdb.asia-southeast1.firebasedatabase.app"}
)


def getHistoryFromDatabase(uid):
    ref = db.reference(f"/root/chat_history/{uid}")
    data = ref.get()

    if (data is None):
        return None

    return (data["history"])

def setHistoryInDatabase(uid, history):
    print("RECEIVED HISTORY:")
    print(history)
    print(type(history))
    print("======================================")
    print(history[0])
    print(type(history[0]))
    historyJson = dumps(history[0])

    print(historyJson)
    # ref = db.reference(f'root/chat_history/{uid}')
    # ref.update({ "history": str(history) })