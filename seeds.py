from app import app, db
from models.user import User, UserSchema
from models.time_box import TimeBox, TimeBoxSchema

user_schema = UserSchema()

time_box_schema = TimeBoxSchema()

with app.app_context():
    db.drop_all()
    db.create_all()
    json_input = {
        'username': 'lily',
        'email': 'lily@email',
        'password': 'pass',
    }
    lily = User(username=json_input['username'],email=json_input['email'], password=json_input['password'])
    lily.save()
    db.session.add(lily)
    db.session.commit()

