from flask import Flask, request, jsonify
from flask_cors import CORS
from model import RiskPredictor

app = Flask(__name__)
CORS(app)

predictor = RiskPredictor()

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Student Risk Prediction API',
        'status': 'running'
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        required_fields = [
            'attendance', 'assignment_score', 'midterm_score',
            'study_hours', 'participation', 'previous_gpa'
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        features = {
            'attendance': float(data['attendance']),
            'assignment_score': float(data['assignment_score']),
            'midterm_score': float(data['midterm_score']),
            'study_hours': float(data['study_hours']),
            'participation': float(data['participation']),
            'previous_gpa': float(data['previous_gpa'])
        }

        result = predictor.predict(features)

        return jsonify({
            'success': True,
            'student_name': data.get('student_name', 'Student'),
            'risk_probability': result['risk_probability'],
            'risk_level': result['risk_level'],
            'recommendations': result['recommendations']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)