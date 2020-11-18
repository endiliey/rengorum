import logging
import os

from flask import (
    Flask,
    current_app,
    request,
)
from flask.logging import default_handler
from flask_restful import Api
from multiprocessing.pool import ThreadPool


from flask_app.resources import (
    forum,
)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    api = Api(app)
    app.config.from_mapping(SECRET_KEY='dev')

    werkzeug_logger = logging.getLogger("werkzeug")
    werkzeug_logger.disabled = True

    from . import db
    db.init_app(app)

    # from . import auth
    # auth = auth.MKAuth(app)
    # app.auth = auth

    from flask_app.routes import get_routes
    get_routes(app)

    app.thread_pool = ThreadPool()

    def rengorum_home():
        return 'Rengorum API Homepage'

    app.add_url_rule('/', view_func=rengorum_home)

    api.add_resource(forum.ForumResource, "/forum")

    return app
