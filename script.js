const API_URL = 'http://localhost:5000';

// ===== PREDICT FUNCTION =====
document.getElementById('predictionForm')
  .addEventListener('submit', async function(e) {
    e.preventDefault();
    await predictRisk();
});

async function predictRisk() {
    const formData = {
        student_name:     document.getElementById('student_name').value,
        attendance:       document.getElementById('attendance').value,
        assignment_score: document.getElementById('assignment_score').value,
        midterm_score:    document.getElementById('midterm_score').value,
        study_hours:      document.getElementById('study_hours').value,
        participation:    document.getElementById('participation').value,
        previous_gpa:     document.getElementById('previous_gpa').value
    };

    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('resultCard').style.display = 'none';
    document.getElementById('predictBtn').disabled = true;

    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            displayResult(result, formData);
        } else {
            alert('Error: ' + (result.error || 'Unknown error'));
        }

    } catch (error) {
        console.error(error);
        alert('Connection failed. Using demo mode...');
        // Demo mode if backend not available
        demoPredict(formData);
    } finally {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('predictBtn').disabled = false;
    }
}

// ===== DISPLAY RESULT =====
function displayResult(result, formData) {
    const riskLevel = result.risk_level.toLowerCase();
    const probability = result.risk_probability;

    // Student Info
    document.getElementById('studentInfo').innerHTML = 
        `👤 ${result.student_name}`;

    // Risk Badge
    const badge = document.getElementById('riskBadge');
    badge.className = `risk-badge ${riskLevel}`;
    const icons = { low: '✅ LOW RISK', medium: '⚠️ MEDIUM RISK', high: '🚨 HIGH RISK' };
    badge.textContent = icons[riskLevel];

    // Meter Fill
    const fill = document.getElementById('meterFill');
    fill.className = `meter-fill ${riskLevel}`;
    setTimeout(() => { fill.style.width = probability + '%'; }, 100);

    // Percentage
    document.getElementById('riskPercentage').textContent = 
        `${probability}% Risk`;

    // Stats Grid
    document.getElementById('statsGrid').innerHTML = `
        <div class="stat-item">
            <div class="stat-label">📅 Attendance</div>
            <div class="stat-value">${formData.attendance}%</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">📝 Assignment</div>
            <div class="stat-value">${formData.assignment_score}%</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">📊 Midterm</div>
            <div class="stat-value">${formData.midterm_score}%</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">⏰ Study Hours</div>
            <div class="stat-value">${formData.study_hours}h/day</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">🙋 Participation</div>
            <div class="stat-value">${formData.participation}/10</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">🏆 GPA</div>
            <div class="stat-value">${formData.previous_gpa}</div>
        </div>
    `;

    // Recommendations
    const recList = document.getElementById('recList');
    recList.innerHTML = '';
    result.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recList.appendChild(li);
    });

    // Show result
    document.getElementById('resultCard').style.display = 'block';
    document.getElementById('resultCard')
            .scrollIntoView({ behavior: 'smooth' });
}

// ===== DEMO MODE (no backend) =====
function demoPredict(formData) {
    const att   = parseFloat(formData.attendance);
    const mid   = parseFloat(formData.midterm_score);
    const asgn  = parseFloat(formData.assignment_score);
    const gpa   = parseFloat(formData.previous_gpa);
    const study = parseFloat(formData.study_hours);

    let riskScore = 0;
    if (att  < 70) riskScore += 30;
    if (mid  < 50) riskScore += 25;
    if (asgn < 50) riskScore += 20;
    if (gpa  < 2.0) riskScore += 15;
    if (study < 3) riskScore += 10;

    riskScore = Math.min(riskScore, 95);

    let riskLevel;
    if (riskScore >= 70)      riskLevel = 'HIGH';
    else if (riskScore >= 40) riskLevel = 'MEDIUM';
    else                      riskLevel = 'LOW';

    const recs = [];
    if (att  < 75)  recs.push("⚠️ Improve attendance");
    if (mid  < 60)  recs.push("📚 Focus on exam preparation");
    if (asgn < 60)  recs.push("📝 Complete all assignments");
    if (study < 4)  recs.push("⏰ Increase study hours");
    if (gpa  < 2.5) recs.push("🎯 Seek academic counseling");
    if (!recs.length) recs.push("✅ Keep up the great work!");

    displayResult({
        success: true,
        student_name: formData.student_name || 'Student',
        risk_probability: riskScore,
        risk_level: riskLevel,
        recommendations: recs
    }, formData);
}

// ===== SAMPLE DATA =====
function fillSample(type) {
    const samples = {
        low: {
            name: 'Alice Johnson', attendance: 95,
            assignment: 88, midterm: 82,
            study: 6, participation: 8, gpa: 3.7
        },
        medium: {
            name: 'Bob Smith', attendance: 72,
            assignment: 65, midterm: 60,
            study: 3, participation: 5, gpa: 2.5
        },
        high: {
            name: 'Charlie Brown', attendance: 55,
            assignment: 40, midterm: 35,
            study: 1, participation: 2, gpa: 1.5
        }
    };

    const s = samples[type];
    document.getElementById('student_name').value     = s.name;
    document.getElementById('attendance').value        = s.attendance;
    document.getElementById('assignment_score').value  = s.assignment;
    document.getElementById('midterm_score').value     = s.midterm;
    document.getElementById('study_hours').value       = s.study;
    document.getElementById('participation').value     = s.participation;
    document.getElementById('previous_gpa').value      = s.gpa;
}

// ===== RESET FORM =====
function resetForm() {
    document.getElementById('predictionForm').reset();
    document.getElementById('resultCard').style.display = 'none';
    const fill = document.getElementById('meterFill');
    fill.style.width = '0%';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}