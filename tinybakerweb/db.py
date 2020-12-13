import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext
import os


DATABASE = 'DATABASE'
IN_MEMORY_DOMAIN = "IN_MEMORY"


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config[DATABASE],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def build_db():
    db = get_db()

    with current_app.open_resource('./schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('build-db')
@with_appcontext
def build_db_command():
    """Clear the existing data and create new tables."""
    build_db()
    click.echo('Built the database.')


# TODO: Make this work with non-sqlite DBs
def init_db(app, transforms):
    app.config[DATABASE] = os.environ[DATABASE]
    app.teardown_appcontext(close_db)
    app.cli.add_command(build_db_command)

    @app.before_first_request
    def ensure_db_is_in_a_sane_state():
        if not os.path.exists(app.config[DATABASE]):
            build_db()
        db = get_db()
