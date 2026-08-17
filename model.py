import numpy as np
import tensorflow as tf
import pickle

class RiskPredictor:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.load_model()

    def load_model(self):
        try:
            self.model = tf.keras.models.load_model('student_model.h5')
            with open('scaler.pkl', 'rb') as f:
                self.scaler = pickle.load(f)
            print("Model loaded successfully!")
        except Exception as e:
            print(f"Error loading model: {e}")

    def predict(self, features):
        """
        features: dict with keys:
        - attendance (0-100)
        - assignment_score (0-100)
        - midterm_score (0-100)
        - study_hours (1-12)
        - participation (0-10)
        - previous_gpa (0-4)
        """
        input_data = np.array([[
            features['attendance'],
            features['assignment_score'],
            features['midterm_score'],
            features['study_hours'],
            features['participation'],
            features['previous_gpa']
        ]])

        input_scaled = self.scaler.transform(input_data)
        risk_probability = self.model.predict(input_scaled)[0][0]
        risk_percentage = round(float(risk_probability) * 100, 2)

        if risk_percentage >= 70:
            risk_level = "HIGH"
        elif risk_percentage >= 40:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"

        recommendations = self.get_recommendations(features, risk_level)

        return {
            'risk_probability': risk_percentage,
            'risk_level': risk_level,
            'recommendations': recommendations
        }

    def get_recommendations(self, features, risk_level):
        recs = []

        if features['attendance'] < 75:
            recs.append("⚠️ Improve attendance - currently below 75%")
        if features['midterm_score'] < 60:
            recs.append("📚 Focus on exam preparation - midterm score is low")
        if features['assignment_score'] < 60:
            recs.append("📝 Complete all assignments on time")
        if features['study_hours'] < 4:
            recs.append("⏰ Increase daily study hours to at least 4 hours")
        if features['participation'] < 5:
            recs.append("🙋 Participate more in class activities")
        if features['previous_gpa'] < 2.5:
            recs.append("🎯 Seek academic counseling for GPA improvement")

        if not recs:
            recs.append("✅ Keep up the great work! Maintain your current performance.")

        return recs