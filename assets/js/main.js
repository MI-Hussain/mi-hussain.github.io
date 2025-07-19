// Dark / Light Theme
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('pref-theme');
if (storedTheme) root.setAttribute('data-theme', storedTheme);

function toggleTheme(){
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', current);
  localStorage.setItem('pref-theme', current);
}
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle){
  navToggle.addEventListener('click', ()=> navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=> navLinks.classList.remove('open')));
}

// Contact form status (if using Formspree or similar)
const form = document.getElementById('contactForm');
if (form){
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (e)=>{
    if (!form.action.includes('formspree')) return;
    e.preventDefault();
    status.textContent = 'Sending...';
    try {
      const data = new FormData(form);
      const res = await fetch(form.action, { method:'POST', body: data, headers: { 'Accept':'application/json' }});
      if (res.ok){
        status.textContent = 'Message sent!';
        form.reset();
      } else {
        status.textContent = 'Error — try again later.';
      }
    } catch(err){
      status.textContent = 'Network error.';
    }
  });
}

