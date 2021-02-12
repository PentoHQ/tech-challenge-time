from flask import Blueprint, jsonify, request, g
from models.time_box import TimeBox, TimeBoxSchema
from marshmallow import ValidationError
from app import db, ma
from lib.secure_route import secure_route

api = Blueprint('time_boxes', __name__)
time_box_schema = TimeBoxSchema()

@api.route('/time-box', methods=['POST'])
@secure_route
def create():
    json_input = request.get_json()
    try:
        time_box = time_box_schema.load(json_input)
        errors = None
    except ValidationError as err:
        errors = err.messages
        valid_data = err.valid_data
    if errors:
        return jsonify(errors), 422  
    new_time_box = TimeBox(name=json_input['name'])
    new_time_box.user = g.current_user
    new_time_box.save()
    return jsonify({'id': str(new_time_box.id)}), 201

@api.route('/time-box/<int:time_box_id>', methods=['POST'])
@secure_route
def update(time_box_id):
    time_box = TimeBox.query.get(time_box_id)
    time_box.active = False
    time_box.save()
    return time_box_schema.jsonify(time_box), 200

@api.route('/time-boxes', methods=['GET'])
@secure_route
def show():
    user = g.current_user
    time_boxes = TimeBox.query.select_from(TimeBox).filter(TimeBox.user_id==user.id).all()
    if not time_boxes:
        return jsonify({'message': 'not found'}), 404
    return time_box_schema.jsonify(time_boxes, many=True), 200

@api.route('/time-box/<int:time_box_id>', methods=['DELETE'])
@secure_route
def cancel(time_box_id):
    time_box = TimeBox.query.get(time_box_id)
    time_box.remove()
    if not time_box:
        return jsonify({'message': 'not found'}), 404
    return jsonify({'message': 'cancelled'}), 200