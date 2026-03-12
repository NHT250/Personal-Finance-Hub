from datetime import datetime, timezone
from flask import Blueprint, g, request
from bson import ObjectId

from ..utils.auth_guard import require_auth
from ..utils.response import fail, ok

goals_bp = Blueprint('goals', __name__)


@goals_bp.get('')
@require_auth
def list_goals():
    docs = list(g.db.goals.find({'user_id': g.user_id}).sort('created_at', -1))
    for doc in docs:
        doc['id'] = str(doc.pop('_id'))
        doc['user_id'] = str(doc['user_id'])
    return ok(docs)


@goals_bp.post('')
@require_auth
def create_goal():
    data = request.get_json() or {}
    required = ['title', 'target_amount', 'current_amount', 'deadline']
    if any(field not in data for field in required):
        return fail('Thiếu trường dữ liệu bắt buộc')

    doc = {
        'user_id': g.user_id,
        'title': data['title'],
        'target_amount': float(data['target_amount']),
        'current_amount': float(data['current_amount']),
        'deadline': data['deadline'],
        'theme': data.get('theme', 'default'),
        'icon': data.get('icon', 'target'),
        'created_at': datetime.now(timezone.utc),
    }
    result = g.db.goals.insert_one(doc)
    return ok({'id': str(result.inserted_id)}, 'Tạo mới thành công', 201)


@goals_bp.put('/<goal_id>')
@require_auth
def update_goal(goal_id):
    payload = request.get_json() or {}
    result = g.db.goals.update_one({'_id': ObjectId(goal_id), 'user_id': g.user_id}, {'$set': payload})
    if result.matched_count == 0:
        return fail('Không tìm thấy mục tiêu', 404)
    return ok(message='Cập nhật thành công')


@goals_bp.delete('/<goal_id>')
@require_auth
def delete_goal(goal_id):
    result = g.db.goals.delete_one({'_id': ObjectId(goal_id), 'user_id': g.user_id})
    if result.deleted_count == 0:
        return fail('Không tìm thấy mục tiêu', 404)
    return ok(message='Đã xóa thành công')
