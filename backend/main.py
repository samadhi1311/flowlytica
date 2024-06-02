# Filename - main.py

# Import flask
from flask import Flask, jsonify, request
from flask_cors import CORS
from ural import get_normalized_hostname
from pinterest import pinterest

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

    # Print received form data
    print('url: ', url)
    print('count: ', count)
    print('text: ', text)
    print('images: ', images)

    hostname = get_normalized_hostname(url)

    if "pinterest" in hostname:
        result = pinterest(url, count, text, images)
        return result

    return jsonify({'message': 'Invalid URL'})

if __name__ == "__main__":
    app.run(debug=True, port=812)