/* ==========================================================
   login.js — Kishan - Tech Authentication Logic
   Connects to Render Live Backend API
   ========================================================== */

const form       = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const pwInput    = document.getElementById('password');
const emailShell = document.getElementById('emailShell');
const pwShell    = document.getElementById('pwShell');
const emailErr   = document.getElementById('emailErr');
const pwErr      = document.getElementById('pwErr');
const toggleBtn  = document.getElementById('togglePw');
const submitBtn  = document.getElementById('submitBtn');
const statusBox  = document.getElementById('statusBox');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isPw = pwInput.type === 'password';
    pwInput.type = isPw ? 'text' : 'password';
    toggleBtn.textContent = isPw ? 'Hide' : 'Show';
    toggleBtn.setAttribute('aria-label', isPw ? 'Hide password' : 'Show password');
  });
}

function validLogin(v) {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhone = /^[0-9]{10}$/.test(v.replace(/\s|-/g, ''));
  return isEmail || isPhone;
}

function setError(shell, errEl, msg) {
  if (msg) {
    shell.classList.add('error');
    errEl.textContent = msg;
  } else {
    shell.classList.remove('error');
    errEl.textContent = '';
  }
}

if (emailInput) {
  emailInput.addEventListener('input', () => {
    if (emailShell.classList.contains('error') && validLogin(emailInput.value)) {
      setError(emailShell, emailErr, '');
    }
  });
}

if (pwInput) {
  pwInput.addEventListener('input', () => {
    if (pwShell.classList.contains('error') && pwInput.value.length >= 6) {
      setError(pwShell, pwErr, '');
    }
  });
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    if (!validLogin(emailInput.value)) {
      setError(emailShell, emailErr, 'Enter a valid email address.');
      ok = false;
    } else {
      setError(emailShell, emailErr, '');
    }

    if (pwInput.value.length < 6) {
      setError(pwShell, pwErr, 'Password must be at least 6 characters.');
      ok = false;
    } else {
      setError(pwShell, pwErr, '');
    }

    if (!ok) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-label').textContent = 'Signing in…';

    fetch('https://kishan-tech.onrender.com/api/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        password: pwInput.value
      })
    })
    .then(res => res.json())
    .then(data => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-label').textContent = 'Sign In';

      if (data.success) {
        statusBox.classList.add('show');
        statusBox.style.borderColor = 'rgba(111,191,115,.35)';
        statusBox.style.color = '#B7E0BA';
        statusBox.textContent = 'Signed in successfully! Taking you to Home…';

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userProfile', JSON.stringify({ 
          name: data.user.name, 
          email: data.user.email, 
          avatar: '' 
        }));

        setTimeout(() => {
          window.location.href = '../index.html';
        }, 1000);
      } else {
        setError(pwShell, pwErr, data.message || 'Invalid Email or Password.');
      }
    })
    .catch(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-label').textContent = 'Sign In';
      setError(pwShell, pwErr, 'Server connection failed. Please try again!');
    });
  });
}