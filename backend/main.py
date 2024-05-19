# Filename - main.py

# Import flask
from flask import Flask, json, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

# @app.route('/api/sithu', methods=['GET'])
# def users():
#     return jsonify(
#         {
#             "sithu": [
#                 'sithu',
#                 'sama'
#             ]
# 		}
# 	)

@app.route('/analyze', methods=['POST'])
def analyze():

    # Retrieve form data from the request
    form_data = request.json
    
    # Process the form data
    url = form_data.get('url')
    count = form_data.get('count')
    text = form_data.get('text')
    images = form_data.get('images')

    print('url: ', url)
    print('count: ', count)
    print('text: ', text)
    print('images: ', images)

    return jsonify({'message': 'Data received successfully'})


if __name__ == "__main__":
    app.run(debug=True, port=812)