from flask import Blueprint, g, request
from bson import ObjectId

from ..services.auth_service import hash_password, verify_password
from ..utils.auth_guard import require_auth
from ..utils.response import fail, ok

account_bp = Blueprint('account', __name__)


def _serialize_user(user):
    return {
        'id': str(user['_id']),
        'name': user.get('name', ''),
        'email': user.get('email', ''),
        'phone': user.get('phone', ''),
        'profile_image': user.get('profile_image', ''),
    }


@account_bp.get('')
@require_auth
def get_account():
    user = g.db.users.find_one({'_id': ObjectId(g.user_id)})
    if not user:
        return fail('Không tìm thấy tài khoản', 404)
    return ok(_serialize_user(user))


@account_bp.put('')
@require_auth
def update_account():
    data = request.get_json() or {}
    allowed_fields = ['name', 'email', 'phone', 'profile_image']
    updates = {field: data[field] for field in allowed_fields if field in data}

    if not updates:
        return fail('Không có dữ liệu để cập nhật')

    if 'email' in updates:
        updates['email'] = updates['email'].lower().strip()
        existed = g.db.users.find_one({'email': updates['email'], '_id': {'$ne': ObjectId(g.user_id)}})
        if existed:
            return fail('Email đã được sử dụng', 409)

    g.db.users.update_one({'_id': ObjectId(g.user_id)}, {'$set': updates})
    user = g.db.users.find_one({'_id': ObjectId(g.user_id)})
    return ok(_serialize_user(user), 'Thông tin đã được cập nhật thành công!')


@account_bp.put('/password')
@require_auth
def update_password():
    data = request.get_json() or {}
    current_password = data.get('current_password', '')
    new_password = data.get('new_password', '')

    if not current_password or len(new_password) < 6:
        return fail('Vui lòng nhập mật khẩu hiện tại và mật khẩu mới tối thiểu 6 ký tự')

    user = g.db.users.find_one({'_id': ObjectId(g.user_id)})
    if not user:
        return fail('Không tìm thấy tài khoản', 404)

    if not verify_password(user['password_hash'], current_password):
        return fail('Mật khẩu hiện tại không chính xác', 400)

    g.db.users.update_one({'_id': ObjectId(g.user_id)}, {'$set': {'password_hash': hash_password(new_password)}})
    return ok(message='Đổi mật khẩu thành công')
