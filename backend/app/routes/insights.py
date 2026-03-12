from flask import Blueprint, g

from ..utils.auth_guard import require_auth
from ..utils.response import ok

insights_bp = Blueprint('insights', __name__)


@insights_bp.get('/monthly')
@require_auth
def monthly_insights():
    pipeline = [
        {'$match': {'user_id': g.user_id}},
        {'$group': {'_id': {'month': {'$substr': ['$date', 0, 7]}, 'type': '$type'}, 'total': {'$sum': '$amount'}}},
    ]
    rows = list(g.db.transactions.aggregate(pipeline))
    return ok(rows)


@insights_bp.get('/categories')
@require_auth
def category_insights():
    pipeline = [
        {'$match': {'user_id': g.user_id, 'type': 'expense'}},
        {'$group': {'_id': '$category', 'value': {'$sum': '$amount'}}},
        {'$sort': {'value': -1}},
    ]
    rows = list(g.db.transactions.aggregate(pipeline))
    return ok(rows)
