from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from .config import configuration

db = SQLAlchemy()


def create_app(env_name):
    app = Flask(__name__)
    app.config.from_object(configuration[env_name])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    db.init_app(app)

    from models import Item, Bucketlist, User

    return app