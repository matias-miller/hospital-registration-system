// renderer.js
async function executeSqlQuery(query) {
  try {
    const response = await fetch(`http://localhost:3000/executeSqlQuery?sql=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.error) {
      console.error('Error executing query:', data.error);
    } else {
      console.log('Query results:', data);
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.nav-btn');
  const contentDiv = document.getElementById('content');

  async function checkDatabaseForErrors() {
    try {
      const response = await fetch('http://localhost:3000/checkDatabaseForErrors');
      const data = await response.json();
      if (data.error) {
        contentDiv.innerHTML = `<h3>error connecting: ${data.error}</h3>`;
      } else {
        
        console.log('connected as id ' + data.threadId);
      }
    } catch (err) {
      console.error(err);
    }
  }

  checkDatabaseForErrors();

  navBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const page = btn.getAttribute('data-page');
      if (page == `page1`) {
        await checkDatabaseForErrors();
        contentDiv.innerHTML = `<h1>${page}</h1><p>Welcome to ${page}!</p>`;
        contentDiv.innerHTML += `
            <form id="patient-form">
              <label for="first_name">First Name:</label>
              <input type="text" id="first_name" name="first_name" required>
              <br>
              <label for="last_name">Last Name:</label>
              <input type="text" id="last_name" name="last_name" required>
              <br>
              <label for="date_of_birth">Date of Birth:</label>
              <input type="date" id="date_of_birth" name="date_of_birth" required>
              <br>
              <label for="gender">Gender:</label>
              <select id="gender" name="gender" required>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              <br>
              <label for="phone_number">Phone Number:</label>
              <input type="text" id="phone_number" name="phone_number" required>
              <br>
              <label for="address">Address:</label>
              <input type="text" id="address" name="address" required>
              <br>
              <button type="submit">Submit</button>
            </form>
          `;
      } else if (page == `page2`) {
          await checkDatabaseForErrors();
          contentDiv.innerHTML = `<h1>${page}</h1><p>Welcome to ${page}!</p>`;
          contentDiv.innerHTML += `<form id="appointment-form">
          <label for="date">Date:</label>
          <input type="date" id="date" name="date" required>
          <br>
          <label for="time">Time:</label>
          <input type="time" id="time" name="time" required>
          <br>
          <label for="clinic">Clinic:</label>
          <select id="clinic" name="clinic" required>
            <option value="">Select a clinic</option>
            <option value="1">Clinic A</option>
            <option value="2">Clinic B</option>
            <option value="3">Clinic C</option>
          </select>
          <br>
          <label for="reason">Reason for visit:</label>
          <input type="text" id="reason" name="reason" required>
          <br>
          <label for="doctor">Doctor:</label>
          <select id="doctor" name="doctor" required>
            <option value="">Select a doctor</option>
            <option value="1">Dr. John Doe</option>
            <option value="2">Dr. Jane Smith</option>
            <option value="3">Dr. David Lee</option>
          </select>
          <br>
          <label for="patient">Patient:</label>
          <select id="patient" name="patient" required>
            <option value="">Select a patient</option>
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
            <option value="3">David Lee</option>
          </select>
          <br>
          <button type="submit">Submit</button>
        </form>
        `;
      } else if (page == `page3`) {
          await checkDatabaseForErrors();
          contentDiv.innerHTML = `<h1>${page}</h1><p>Welcome to ${page}!</p>`;
          contentDiv.innerHTML += `
              <form id="post-appointment-form">
              <h2>Post-Appointment Form</h2>
              </br>
              <label for="appt-id">Appointment ID:</label>
              <input type="text" id="appt-id" name="appt-id" required>
              </br>
              <label for="pres-treatment">Prescribed Treatment:</label>
              <textarea id="pres-treatment" name="pres-treatment"></textarea>
              </br>
              <label for="alt-treatment">Alternative Treatment Options:</label>
              <textarea id="alt-treatment" name="alt-treatment"></textarea>
              </br>
              <label for="notes">Additional Notes:</label>
              <textarea id="notes" name="notes"></textarea>
              </br>
              <label for="appointment-cost">Appointment Cost:</label>
              <input type="number" id="appointment-cost" name="appointment-cost" required>
              </br>
              <button type="submit">Submit</button>
            </form>`;
      }
    });
  });

  // Form submission logic
  document.addEventListener('submit', async (event) => {
    event.preventDefault();
    const targetForm = event.target;

    if (targetForm.id === 'patient-form') {
      const first_name = document.getElementById('first_name').value;
      const last_name = document.getElementById('last_name').value;
      const date_of_birth = document.getElementById('date_of_birth').value;
      const gender = document.getElementById('gender').value;
      const phone_number = document.getElementById('phone_number').value;
      const address = document.getElementById('address').value;

      const query = `INSERT INTO patient (first_name, last_name, date_of_birth, gender, phone_number, address) VALUES ('${first_name}', '${last_name}', '${date_of_birth}', '${gender}', '${phone_number}', '${address}')`;
      await executeSqlQuery(query);
      alert('Patient information submitted successfully!');
    } else if (targetForm.id === 'appointment-form'){
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const clinic = document.getElementById('clinic').value;
      const reason = document.getElementById('reason').value;
      const doctor = document.getElementById('doctor').value;
      const patient = document.getElementById('patient').value;

      const query = `INSERT INTO appointment (date, time, clinic_id, reason, doctor_id, patient_id) 
                VALUES ('${date}', '${time}', '${clinic}', '${reason}', '${doctor}', '${patient}')`;
      await executeSqlQuery(query);
      alert('Appointment information submitted successfully!');
    } else if (targetForm.id === 'post-appointment-form') {
      const appt_id = document.getElementById('appt-id').value;
      const pres_treatment = document.getElementById('pres-treatment').value;
      const alt_treatment = document.getElementById('alt-treatment').value;
      const notes = document.getElementById('notes').value;
      const appointment_cost = document.getElementById('appointment-cost').value;
  
      const query = `INSERT INTO appointment_summary (appt_id, pres_treatment, alt_treatment, notes, appointment_cost) VALUES ('${appt_id}', '${pres_treatment}', '${alt_treatment}', '${notes}', '${appointment_cost}')`;
      await executeSqlQuery(query);
      alert('Post-Appointment Form submitted successfully!');
    }
  });

  const homeBtn = document.getElementById('homeBtn');
  homeBtn.addEventListener('click', () => {
    contentDiv.innerHTML = '<h1>HomePage</h1>';
    executeSqlQuery('DELETE FROM appointment;')
    executeSqlQuery('DELETE FROM appointment_summary;')
    executeSqlQuery('DELETE FROM clinic;')
    executeSqlQuery('DELETE FROM doctor;')
    executeSqlQuery('DELETE FROM outstanding_balance;')
    executeSqlQuery('DELETE FROM patient;')
    executeSqlQuery('DELETE FROM patient_primary_doctor;')
    executeSqlQuery('DELETE FROM pharmacy;')
    executeSqlQuery('DELETE FROM prescription;')
    contentDiv.innerHTML += '<h1>Database Reset.</h1>';
  });

  const settingsBtn = document.getElementById('settingsBtn');
  settingsBtn.addEventListener('click', async () => {
    try {
      const sql = fs.readFileSync('data.sql', 'utf-8');
      const queries = sql.split(';').filter(query => query.trim() !== '');
      for (const query of queries) {
        await executeSqlQuery(query);
      }
      contentDiv.innerHTML += '<h1>Database imported.</h1>';
    } catch (err) {
      console.error(err);
      contentDiv.innerHTML += '<h1>Error importing database.</h1>';
    }
  });
});
