from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
CORS(app)  # 모든 출처에서의 요청을 허용합니다.

# Global variables to store coordinates
start_coordinates = None
end_coordinates = None

# MongoDB 클라이언트 설정
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
users_collection = db['users']

@app.route('/coordinates', methods=['POST'])
def receive_coordinates():
    global start_coordinates, end_coordinates
    data = request.json
    if data.get('type') == 'start':
        start_coordinates = data
    elif data.get('type') == 'end':
        end_coordinates = data
    print("Received coordinates:", data)
    return jsonify({"message": "Coordinates received successfully"})

@app.route('/coordinates', methods=['GET'])
def display_message():
    return "hi"


@app.route('/coordinates/start', methods=['GET'])
def get_start_coordinates():
    return jsonify(start_coordinates)

@app.route('/coordinates/end', methods=['GET'])
def get_end_coordinates():
    return jsonify(end_coordinates)

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    value = data.get('value') 
    efficiency = data.get('efficiency')
    oilType = data.get('oilType')
    print(f"주유할 금액: {value}")
    print(f"차량의 연비: {efficiency}(L/Km)")
    print(f"유종: {oilType}")

    return jsonify({"status": "success", "value": value , "efficiency":efficiency})


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({"username": username, "password": hashed_password})
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = users_collection.find_one({"username": username})
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({"error": "Invalid username or password"}), 400

    return jsonify({"message": "Login successful"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
