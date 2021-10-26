from flask import Blueprint

bp = Blueprint('errors', __name__)

from backend.app.errors import handlers
