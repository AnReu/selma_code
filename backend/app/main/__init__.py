from flask import Blueprint

bp = Blueprint('main', __name__)

from backend.app.main import routes
