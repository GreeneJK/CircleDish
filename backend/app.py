from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:3000').split(',')

CORS(app, resources={
    r"/*": {
        "origins": ALLOWED_ORIGINS,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'Circle Dish API',
        'version': '1.0.0'
    }), 200

@app.route('/api/v1/circles', methods=['GET'])
def get_circles():
    return jsonify({
        'circles': [],
        'message': 'Circle endpoints coming soon'
    }), 200

@app.route('/api/v1/recipes', methods=['GET'])
def get_recipes():
    return jsonify({
        'recipes': [],
        'message': 'Recipe endpoints coming soon'
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
