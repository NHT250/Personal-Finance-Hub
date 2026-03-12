from functools import wraps
from flask import request, current_app, g
from bson import ObjectId

from .response import fail
from ..services.auth_service import decode_token


def require_auth(handler):
    @wraps(handler)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return fail('Thiếu token xác thực', 401)

        token = auth_header.split(' ', 1)[1]
        try:
            payload = decode_token(token, current_app.config['SECRET_KEY'])
            g.user_id = ObjectId(payload['sub'])
        except Exception:
            return fail('Token không hợp lệ', 401)

        return handler(*args, **kwargs)

    return wrapper
