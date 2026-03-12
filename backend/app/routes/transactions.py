from datetime import datetime, timezone
from flask import Blueprint, g, request
from bson import ObjectId

from ..utils.auth_guard import require_auth
from ..utils.response import fail, ok

transactions_bp = Blueprint('transactions', __name__)


@transactions_bp.get('')
@require_auth
def list_transactions():
    docs = list(g.db.transactions.find({'user_id': g.user_id}).sort('date', -1))
    for doc in docs:
        doc['id'] = str(doc.pop('_id'))
        doc['user_id'] = str(doc['user_id'])
    return ok(docs)


@transactions_bp.post('')
@require_auth
def create_transaction():
    data = request.get_json() or {}
    required = ['type', 'amount', 'category', 'title', 'date']
    if any(field not in data for field in required):
        return fail('Thiếu trường dữ liệu bắt buộc')

    doc = {
        'user_id': g.user_id,
        'type': data['type'],
        'amount': float(data['amount']),
        'category': data['category'],
        'title': data['title'],
        'note': data.get('note', ''),
        'date': data['date'],
        'created_at': datetime.now(timezone.utc),
    }
    result = g.db.transactions.insert_one(doc)
    return ok({'id': str(result.inserted_id)}, 'Tạo mới thành công', 201)


@transactions_bp.put('/<tx_id>')
@require_auth
def update_transaction(tx_id):
    payload = request.get_json() or {}
    result = g.db.transactions.update_one({'_id': ObjectId(tx_id), 'user_id': g.user_id}, {'$set': payload})
    if result.matched_count == 0:
        return fail('Không tìm thấy giao dịch', 404)
    return ok(message='Cập nhật thành công')


@transactions_bp.delete('/<tx_id>')
@require_auth
def delete_transaction(tx_id):
    result = g.db.transactions.delete_one({'_id': ObjectId(tx_id), 'user_id': g.user_id})
    if result.deleted_count == 0:
        return fail('Không tìm thấy giao dịch', 404)
    return ok(message='Đã xóa thành công')
