from datetime import datetime, timezone
from flask import Blueprint, g, request
from bson import ObjectId

from ..utils.auth_guard import require_auth
from ..utils.response import fail, ok

transactions_bp = Blueprint('transactions', __name__)


def _serialize_transaction(doc):
    return {
        'id': str(doc['_id']),
        'user_id': str(doc['user_id']),
        'type': doc['type'],
        'amount': float(doc['amount']),
        'category': doc['category'],
        'title': doc['title'],
        'note': doc.get('note', ''),
        'date': doc['date'],
    }


@transactions_bp.get('')
@require_auth
def list_transactions():
    month = request.args.get('month', type=int)
    year = request.args.get('year', type=int)

    query = {'user_id': g.user_id}

    if month and year:
        if month < 1 or month > 12:
            return fail('Tháng không hợp lệ', 400)

        start_date = datetime(year, month, 1)
        if month == 12:
            next_month = datetime(year + 1, 1, 1)
        else:
            next_month = datetime(year, month + 1, 1)

        query['date'] = {
            '$gte': start_date.strftime('%Y-%m-%d'),
            '$lt': next_month.strftime('%Y-%m-%d'),
        }

    docs = list(g.db.transactions.find(query).sort('date', -1))
    transactions = [_serialize_transaction(doc) for doc in docs]

    if month and year:
        total_income = sum(tx['amount'] for tx in transactions if tx['type'] == 'income')
        total_expenses = sum(tx['amount'] for tx in transactions if tx['type'] == 'expense')
        return ok(
            {
                'month': month,
                'year': year,
                'transactions': transactions,
                'totalIncome': total_income,
                'totalExpenses': total_expenses,
                'totalSavings': total_income - total_expenses,
            }
        )

    return ok(transactions)


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
