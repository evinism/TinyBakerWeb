#!/usr/bin/env python3
from typing import Iterable
import connexion
from flask import send_from_directory
from swagger_server import encoder
from .datastore import datastore

def set_up_static_paths(app):
  @app.app.route('/<path:path>')
  def send_public(path):
    return send_from_directory('./public', path)

  @app.app.route('/static/css/<path:path>')
  def send_static_css(path):
    return send_from_directory('./public/static/css', path)

  @app.app.route('/static/js/<path:path>')
  def send_static_js(path):
    return send_from_directory('./public/static/js', path)

  @app.app.route('/')
  def index():
    return send_from_directory('./public', "index.html")
  

def build_server(transforms: Iterable):
  datastore.transforms = transforms
  app = connexion.FlaskApp(__name__, specification_dir='./../libgen/swagger_server/swagger/')
  app.app.json_encoder = encoder.JSONEncoder
  app.add_api('swagger.yaml', arguments={'title': 'TinyBaker Web'}, pythonic_params=True)

  set_up_static_paths(app)
  return app


if __name__ == '__main__':
  app = build_server([])
  app.run(port=3000)