from datetime import datetime, timezone
from pymongo import MongoClient
from werkzeug.security import generate_password_hash

client = MongoClient('mongodb://localhost:27017')
db = client['pfh']

user = {
    'name': 'Demo User',
    'email': 'demo@pfh.app',
    'password_hash': generate_password_hash('password123'),
    'created_at': datetime.now(timezone.utc),
}
user_id = db.users.insert_one(user).inserted_id

db.transactions.insert_many([
    {'user_id': user_id, 'type': 'income', 'amount': 3200, 'category': 'Work', 'title': 'Salary', 'note': '', 'date': '2026-03-01', 'created_at': datetime.now(timezone.utc)},
    {'user_id': user_id, 'type': 'expense', 'amount': 120, 'category': 'Food', 'title': 'Groceries', 'note': '', 'date': '2026-03-03', 'created_at': datetime.now(timezone.utc)},
])

db.goals.insert_one({'user_id': user_id, 'title': 'Emergency Fund', 'target_amount': 5000, 'current_amount': 2900, 'deadline': '2026-12-31', 'theme': 'mint', 'icon': 'shield', 'created_at': datetime.now(timezone.utc)})

print('Seed complete for demo@pfh.app / password123')
