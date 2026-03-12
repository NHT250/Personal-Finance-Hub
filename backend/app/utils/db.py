from pymongo import MongoClient
from flask import g

client = None


def init_db(app):
    global client
    client = MongoClient(app.config['MONGO_URI'])

    @app.before_request
    def before_request():
        g.db = client[app.config['DB_NAME']]
