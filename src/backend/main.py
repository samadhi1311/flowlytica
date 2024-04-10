# Filename - main.py

# Import flask
from flask import Flask, json, jsonify, request
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

@app.route('/analyze', methods=['POST'])
def analyze():

    # Retrieve form data from the request
    form_data = request.json
    
    # Process the form data
    url = form_data.get('url')
    count = form_data.get('count')
    content_text = form_data.get('content_text')
    content_images = form_data.get('content_images')

    print('url: ', url)
    print('count: ', count)
    print('content_text: ', content_text)
    print('content_images: ', content_images)

    return jsonify({'message': 'Data received successfully'})


if __name__ == "__main__":
    app.run(debug=True, port=812)