// renderer.js
document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const contentDiv = document.getElementById('content');
  
    navBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const page = btn.getAttribute('data-page');
        if (page) {
          contentDiv.innerHTML = `<h1>${page}</h1><p>Welcome to ${page}!</p>`;
        }
      });
    });
  
    const homeBtn = document.getElementById('homeBtn');
    homeBtn.addEventListener('click', () => {
      contentDiv.innerHTML = '<h1>HomePage</h1>';
    });
  
    const settingsBtn = document.getElementById('settingsBtn');
    settingsBtn.addEventListener('click', () => {
      // Add your settings logic here
      contentDiv.innerHTML = '<h1>Settings</h1>';
    });
  });