import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow import keras
import pickle

# Generate sample student data
np.random.seed(42)
n_students = 1000

data = {
    'attendance': np.random.uniform(40, 100, n_students),
    'assignment_score': np.random.uniform(30, 100, n_students),
    'midterm_score': np.random.uniform(25, 100, n_students),
    'study_hours': np.random.uniform(1, 12, n_students),
    'participation': np.random.uniform(0, 10, n_students),
    'previous_gpa': np.random.uniform(1.0, 4.0, n_students),
}

df = pd.DataFrame(data)

# Create risk label (1 = at risk, 0 = not at risk)
df['at_risk'] = ((df['attendance'] < 70) | 
                  (df['midterm_score'] < 50) | 
                  (df['assignment_score'] < 50) | 
                  (df['previous_gpa'] < 2.0)).astype(int)

X = df.drop('at_risk', axis=1).values
y = df['at_risk'].values

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Save scaler
with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

# Build Deep Learning Model
model = keras.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(6,)),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(32, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(16, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

print("Training model...")
model.fit(
    X_train_scaled, y_train,
    epochs=50,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# Evaluate
loss, accuracy = model.evaluate(X_test_scaled, y_test)
print(f"\nTest Accuracy: {accuracy:.4f}")

# Save model
model.save('student_model.h5')
print("Model saved as 'student_model.h5'")
print("Scaler saved as 'scaler.pkl'")