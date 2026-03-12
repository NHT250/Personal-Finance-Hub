from datetime import datetime, timezone
from flask import Blueprint, g, request
from bson import ObjectId

from ..utils.auth_guard import require_auth
from ..utils.response import fail, ok

goals_bp = Blueprint('goals', __name__)


def _normalize_status(current_amount, target_amount, provided_status=None):
    if provided_status:
        return provided_status
    if target_amount <= 0:
        return 'Chưa hoàn thành'
    ratio = current_amount / target_amount
    if ratio >= 1:
        return 'Hoàn thành'
    if ratio >= 0.5:
        return 'Đang tiến hành'
    return 'Chưa hoàn thành'


@goals_bp.get('')
@require_auth
def list_goals():
    query = {'user_id': g.user_id}

    status = request.args.get('status')
    search = request.args.get('search', '').strip()
    min_saved = request.args.get('min_saved')
    deadline_before = request.args.get('deadline_before')
    deadline_after = request.args.get('deadline_after')

    if status:
        query['status'] = status
    if min_saved:
        query['current_amount'] = {'$gte': float(min_saved)}
    if deadline_before or deadline_after:
        range_query = {}
        if deadline_before:
            range_query['$lte'] = deadline_before
        if deadline_after:
            range_query['$gte'] = deadline_after
        query['deadline'] = range_query

    docs = list(g.db.goals.find(query).sort('created_at', -1))

    if search:
        docs = [doc for doc in docs if search.lower() in doc.get('title', '').lower()]

    for doc in docs:
        doc['id'] = str(doc.pop('_id'))
        doc['user_id'] = str(doc['user_id'])
    return ok(docs)


@goals_bp.post('')
@require_auth
def create_goal():
    data = request.get_json() or {}

    title = data.get('title') or data.get('goal_name')
    target_amount = data.get('target_amount')
    current_amount = data.get('current_amount', data.get('amount_saved'))
    deadline = data.get('deadline') or data.get('completion_date')

    if not title or target_amount is None or current_amount is None or not deadline:
        return fail('Thiếu trường dữ liệu bắt buộc')

    target_amount = float(target_amount)
    current_amount = float(current_amount)

    doc = {
        'user_id': g.user_id,
        'title': title,
        'target_amount': target_amount,
        'current_amount': current_amount,
        'deadline': deadline,
        'status': _normalize_status(current_amount, target_amount, data.get('status')),
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

    goal = g.db.goals.find_one({'_id': ObjectId(goal_id), 'user_id': g.user_id})
    if not goal:
        return fail('Không tìm thấy mục tiêu', 404)

    if payload.get('add_amount') is not None:
        next_current = float(goal.get('current_amount', 0)) + float(payload['add_amount'])
        payload['current_amount'] = next_current
        payload['status'] = _normalize_status(next_current, float(goal.get('target_amount', 0)), payload.get('status'))
        payload.pop('add_amount', None)

    if payload.get('current_amount') is not None:
        target = float(payload.get('target_amount', goal.get('target_amount', 0)))
        payload['status'] = _normalize_status(float(payload['current_amount']), target, payload.get('status'))

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
