import click
import mongoengine
import time

from flask import current_app
from flask.cli import with_appcontext
from flask_mongoengine import MongoEngine


def init_app(app):
    app.config['MONGODB_SETTINGS'] = {
        "db": app.config.get('MONGO_DB', 'molekuls'),
        "host": app.config.get('MONGO_HOST', 'localhost'),
        "port": 27017,
        "connect": False
    }

    mongo_username = app.config.get("MONGO_USER", None)
    mongo_password = app.config.get("MONGO_PASSWORD", None)

    if mongo_username:
        app.config['MONGODB_SETTINGS']['username'] = mongo_username
        if mongo_password:
            app.config['MONGODB_SETTINGS']['password'] = mongo_password
            app.config['MONGODB_SETTINGS']['authentication_source'] = 'admin'

    try:
        db = MongoEngine(app)
    except mongoengine.connection.ConnectionFailure:
        mongoengine.disconnect()
        db = MongoEngine(app)
