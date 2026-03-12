from flask import Flask
from flask_cors import CORS

from .utils.config import Config
from .utils.db import init_db
from .routes.auth import auth_bp
from .routes.transactions import transactions_bp
from .routes.goals import goals_bp
from .routes.insights import insights_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    init_db(app)

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(transactions_bp, url_prefix='/transactions')
    app.register_blueprint(goals_bp, url_prefix='/goals')
    app.register_blueprint(insights_bp, url_prefix='/insights')

    @app.get('/health')
    def health():
        return {'status': 'ok', 'message': 'PFH API đang hoạt động'}

    return app
