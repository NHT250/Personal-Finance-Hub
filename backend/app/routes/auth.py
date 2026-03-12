from datetime import datetime, timezone
from flask import Blueprint, current_app, g, request
from bson import ObjectId

from ..services.auth_service import create_token, hash_password, verify_password
from ..utils.auth_guard import require_auth
from ..utils.response import fail, ok

auth_bp = Blueprint('auth', __name__)


@auth_bp.post('/register')
def register():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').lower().strip()
    password = data.get('password', '')

    if not name or not email or len(password) < 6:
        return fail('Vui lòng nhập tên, email hợp lệ và mật khẩu tối thiểu 6 ký tự')

    if g.db.users.find_one({'email': email}):
        return fail('Email đã được đăng ký', 409)

    user_doc = {
        'name': name,
        'email': email,
        'password_hash': hash_password(password),
        'created_at': datetime.now(timezone.utc),
    }
    result = g.db.users.insert_one(user_doc)
    token = create_token(result.inserted_id, current_app.config['SECRET_KEY'], current_app.config['JWT_EXP_MINUTES'])
    return ok({'token': token, 'user': {'id': str(result.inserted_id), 'name': name, 'email': email}}, 'Đăng ký thành công', 201)


@auth_bp.post('/login')
def login():
    data = request.get_json() or {}
    email = data.get('email', '').lower().strip()
    password = data.get('password', '')

    user = g.db.users.find_one({'email': email})
    if not user or not verify_password(user['password_hash'], password):
        return fail('Email hoặc mật khẩu không đúng', 401)

    token = create_token(user['_id'], current_app.config['SECRET_KEY'], current_app.config['JWT_EXP_MINUTES'])
    return ok({'token': token, 'user': {'id': str(user['_id']), 'name': user['name'], 'email': user['email']}}, 'Đăng nhập thành công')


@auth_bp.get('/me')
@require_auth
def me():
    user = g.db.users.find_one({'_id': ObjectId(g.user_id)})
    if not user:
        return fail('Không tìm thấy người dùng', 404)
    return ok({'id': str(user['_id']), 'name': user['name'], 'email': user['email']})
