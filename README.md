# 🎓 Smart Student Academic Risk Prediction

## 📌 Project Overview

**Smart Student Academic Risk Prediction** is a Deep Learning-based project designed to identify students who may be at academic risk based on factors such as attendance, previous academic performance, study habits, assignment scores, and other relevant academic parameters.

The system analyzes student data and predicts whether a student is likely to be **At Risk** or **Not At Risk**. This can help educational institutions and faculty members identify students who may need additional academic support at an early stage.

## 🎯 Objectives

* Predict students who are academically at risk.
* Analyze important factors affecting student performance.
* Use Deep Learning for academic risk classification.
* Help teachers identify students requiring additional support.
* Improve student academic outcomes through early intervention.
* Provide a simple and user-friendly prediction system.

## 🚀 Features

* Student academic data preprocessing
* Data cleaning and normalization
* Exploratory Data Analysis
* Deep Learning model training
* Academic risk prediction
* Model performance evaluation
* Accuracy and loss visualization
* Confusion matrix analysis
* Prediction for new student data

## 🧠 Technologies Used

* **Python**
* **TensorFlow / Keras**
* **Pandas**
* **NumPy**
* **Scikit-learn**
* **Matplotlib**
* **Seaborn**
* **Jupyter Notebook / VS Code**

## 📊 Input Parameters

The model can use academic and behavioral features such as:

* Student Attendance
* Internal/Assignment Marks
* Previous Semester Marks
* Study Hours
* Assignment Completion
* Previous Academic Performance
* Participation
* Academic History

## 🔄 Project Workflow

```text
Student Dataset
       ↓
Data Collection
       ↓
Data Preprocessing
       ↓
Feature Selection
       ↓
Data Visualization
       ↓
Train-Test Split
       ↓
Deep Learning Model
       ↓
Model Training
       ↓
Model Evaluation
       ↓
Academic Risk Prediction
```

## 🤖 Deep Learning Model

The project uses an Artificial Neural Network (ANN) for classification.

Typical architecture:

```text
Input Layer
     ↓
Dense Layer
     ↓
ReLU Activation
     ↓
Dropout Layer
     ↓
Dense Layer
     ↓
ReLU Activation
     ↓
Output Layer
     ↓
Risk Prediction
```

The model classifies students into categories such as:

* **0 → Not At Risk**
* **1 → At Risk**

## 📈 Model Evaluation

The trained model can be evaluated using:

* Accuracy
* Precision
* Recall
* F1-Score
* Confusion Matrix
* Training and Validation Loss
* Training and Validation Accuracy

## 📁 Project Structure

```text
Smart-Student-Academic-Risk-Prediction/
│
├── dataset/
│   └── student_data.csv
│
├── model/
│   └── academic_risk_model.h5
│
├── notebooks/
│   └── academic_risk_prediction.ipynb
│
├── src/
│   ├── data_preprocessing.py
│   ├── train_model.py
│   └── prediction.py
│
├── results/
│   ├── confusion_matrix.png
│   ├── accuracy_graph.png
│   └── loss_graph.png
│
├── requirements.txt
├── README.md
└── LICENSE
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Smart-Student-Academic-Risk-Prediction.git
```

### 2. Navigate to the Project

```bash
cd Smart-Student-Academic-Risk-Prediction
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

### 4. Install Required Libraries

```bash
pip install -r requirements.txt
```

## ▶️ How to Run

Run the training program:

```bash
python src/train_model.py
```

For making predictions:

```bash
python src/prediction.py
```

You can also run the Jupyter Notebook:

```bash
jupyter notebook
```

Then open:

```text
notebooks/academic_risk_prediction.ipynb
```

## 📋 Example Prediction

### Input

```text
Attendance: 65%
Previous Marks: 52%
Study Hours: 2
Assignment Score: 48%
```

### Output

```text
Academic Risk Prediction: AT RISK
```

Another student:

```text
Attendance: 90%
Previous Marks: 82%
Study Hours: 5
Assignment Score: 88%
```

Output:

```text
Academic Risk Prediction: NOT AT RISK
```

## 🌟 Applications

This project can be useful for:

* Colleges and Universities
* Schools
* Academic Management Systems
* Faculty Monitoring
* Student Performance Analysis
* Early Academic Intervention
* Educational Data Analytics

## 🔮 Future Enhancements

* Develop a web-based dashboard.
* Add real-time student prediction.
* Integrate with college management systems.
* Add Explainable AI (XAI).
* Include more student behavioral features.
* Deploy the model on a cloud platform.
* Create an automated faculty alert system.
* Build a mobile application for students and faculty.

## 👨‍💻 Author

**Poolahemanth Poolahemanth**

Computer Science Student

## 📜 License

This project is developed for **educational and academic purposes**.

---

⭐ If you find this project useful, consider giving the repository a **Star** on GitHub.
