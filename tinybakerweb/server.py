from typing import Iterable
from flask import Flask, render_template

def build_server(transforms: Iterable):
  app = Flask(__name__)

  @app.route('/')
  def index():
    return render_template('index.jinja', transforms=list(zip(range(len(transforms)), transforms)))

  @app.route('/transform/<id>')
  def get_transform(id):
    return render_template('transform.jinja', transform=transforms[int(id)])

  return app
