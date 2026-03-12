def ok(data=None, message='Thành công', code=200):
    return {'success': True, 'message': message, 'data': data}, code


def fail(message='Có lỗi xảy ra', code=400):
    return {'success': False, 'message': message}, code
