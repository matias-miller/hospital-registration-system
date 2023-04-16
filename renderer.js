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
      if (page) {
        await checkDatabaseForErrors();
        contentDiv.innerHTML = `<h1>${page}</h1><p>Welcome to ${page}!</p>`;
      }
    });
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
