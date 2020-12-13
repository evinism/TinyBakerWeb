#!/usr/bin/env python3
from typing import Iterable
import connexion
from flask import send_from_directory
from swagger_server import encoder
from .datastore import datastore
from .db import init_db

def set_up_static_paths(app):
  @app.route('/<path:path>')
  def send_public(path):
    return send_from_directory('./public', path)

  @app.route('/static/css/<path:path>')
  def send_static_css(path):
    return send_from_directory('./public/static/css', path)

  @app.route('/static/js/<path:path>')
  def send_static_js(path):
    return send_from_directory('./public/static/js', path)

  @app.route('/')
  def index():
    return send_from_directory('./public', "index.html")
  

def build_server(transforms: Iterable):
  datastore.transforms = transforms

  specdir = './../libgen/swagger_server/swagger/'
  cxapp = connexion.FlaskApp(__name__, specification_dir=specdir)
  cxapp.app.json_encoder = encoder.JSONEncoder
  cxapp.add_api('swagger.yaml', arguments={'title': 'TinyBaker Web'}, pythonic_params=True)

  set_up_static_paths(cxapp.app)
  init_db(cxapp.app, transforms)
  return cxapp


if __name__ == '__main__':
  cxapp = build_server([])
  cxapp.run(port=3000)