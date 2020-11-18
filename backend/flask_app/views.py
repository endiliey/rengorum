import csv
import json

from flask import (
    jsonify,
    request,
)
from flask_cors import cross_origin
from functools import wraps


try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO

from mongodb.models import (
    accounts,
    forums,
    posts,
    threads,
)


def get_all_users():

    users_list = []
    for user in accounts.UserProfile.objects:
        users_list.append(user.to_json())

    # return "hello"
    return json.dumps(users_list)


def get_admin_view():
    pass


def get_forums():
    forums_list = []
    for forum in forums.Forum.scan():
        forums_list.append(forum.json_serialize())

    return forums_list


def get_threads():
    threads_list = []
    for thread in threads.Thread.scan():
        threads_list.append(thread.json_serialize())

    return threads_list


def get_posts():
    posts_list = []
    for post in posts.Post.scan():
        posts_list.append(post.json_serialize())

    return posts_list
