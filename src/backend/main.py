# Filename - main.py

# Import flask
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/api/sithu', methods=['GET'])
def users():
    return jsonify(
        {
            "sithu": [
                'sithu',
                'sama'
            ]
		}
	)

if __name__ == "__main__":
    app.run(debug=True, port=812)