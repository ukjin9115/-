from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 모든 출처에서의 요청을 허용합니다.

# Global variables to store coordinates
start_coordinates = None
end_coordinates = None

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
    print(f"Received value: {value}")
    return jsonify({"status": "success", "value": value})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
