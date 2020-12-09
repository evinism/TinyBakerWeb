from typing import Iterable
from flask import Flask, render_template

def build_server(transforms: Iterable):
  app = Flask(__name__)

  @app.route('/')
  def index():
    return render_template('index.jinja')

  @app.route('/api/transforms')
  def get_transforms():
    return {"data":[{
      "name": transform.__name__,
      "input_tags": list(transform.input_tags),
      "output_tags": list(transform.output_tags)
    } for transform in transforms]}

  @app.route('/api/transform/<id>')
  def get_transform(id):
    transform = transforms[id]
    return {
      "name": transform.__name__,
      "input_tags": transform.input_tags,
      "output_tags": transform.output_tags
    }

  return app
