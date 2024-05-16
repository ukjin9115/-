from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/coordinates": {"origins": "*"}})  # 모든 출처에서의 요청을 허용합니다.

@app.route('/coordinates', methods=['POST'])
def receive_coordinates():
    data = request.json
    # 받은 좌표 데이터를 처리하는 코드 작성
    print("Received coordinates:", data)
    return jsonify({"message": "Coordinates received successfully"})

if __name__ == '__main__':
    app.run(host='172.20.10.2', port=5000)
