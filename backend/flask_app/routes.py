import datetime
import sys
import time
import traceback

from flask import (
    current_app,
    g,
    jsonify,
    make_response,
    request,
)
from flask_cors import cross_origin
from functools import wraps

from flask_app import views


def get_routes(app):

    @app.route("/api/user", methods=["GET"])
    def get_users():
        return views.get_all_users()

    @app.route("/admin", methods=["GET"])
    def get_admin_page():
        pass

    @app.route("/api/forum", methods=["GET"])
    def get_forums():
        pass

    @app.route("/api/thread", methods=["GET"])
    def get_threads():
        pass

    @app.route("/api/post", methods=["GET"])
    def get_posts():
        pass
