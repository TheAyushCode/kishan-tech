/* ==========================================================
   register.js — Account Creation Logic (Email & Phone Support)
   ========================================================== */

const form       = document.getElementById('registerForm');
const nameInput  = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwInput    = document.getElementById('password');

const nameShell  = document.getElementById('nameShell');
const emailShell = document.getElementById('emailShell');
const pwShell    = document.getElementById('pwShell');

const nameErr    = document.getElementById('nameErr');
const emailErr   = document.getElementById('emailErr');
const pwErr      = document.getElementById('pwErr');

const submitBtn  = document.getElementById('submitBtn');
const statusBox  = document.getElementById('statusBox');

function setError(shell, errEl, msg) {
  if (msg) {
    shell.classList.add('error');
    errEl.textContent = msg;
  } else {
    shell.classList.remove('error');
    errEl.textContent = '';
  }
}

// Check if input is a valid Email OR a valid 10-digit Indian Mobile number
function validateIdentifier(val) {
  const cleanVal = val.trim().replace(/\s|-/g, '');
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanVal);
  const isPhone = /^[6-9]\d{9}$/.test(cleanVal);
  return { valid: isEmail || isPhone, cleanVal };
}

if (nameInput) {
  nameInput.addEventListener('input', () => {
    if (nameShell.classList.contains('error') && nameInput.value.trim().length > 0) {
      setError(nameShell, nameErr, '');
    }
  });
}

if (emailInput) {
  emailInput.addEventListener('input', () => {
    if (emailShell.classList.contains('error') && validateIdentifier(emailInput.value).valid) {
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
    let valid = true;

    if (!nameInput.value.trim()) {
      setError(nameShell, nameErr, 'Please enter your full name.');
      valid = false;
    } else {
      setError(nameShell, nameErr, '');
    }

    const { valid: idValid, cleanVal } = validateIdentifier(emailInput.value);
    if (!idValid) {
      setError(emailShell, emailErr, 'Enter a valid Email or 10-digit Mobile Number.');
      valid = false;
    } else {
      setError(emailShell, emailErr, '');
    }

    if (pwInput.value.length < 6) {
      setError(pwShell, pwErr, 'Password must be at least 6 characters.');
      valid = false;
    } else {
      setError(pwShell, pwErr, '');
    }

    if (!valid) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-label').textContent = 'Creating Account...';

    // Fetch API call to Live Render Backend Server
    fetch('https://kishan-tech.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: cleanVal,
        password: pwInput.value
      })
    })
    .then(res => res.json())
    .then(data => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-label').textContent = 'Create Account';

      if (data.success) {
        statusBox.classList.add('show');
        statusBox.style.borderColor = 'rgba(111,191,115,.35)';
        statusBox.style.color = '#B7E0BA';
        statusBox.textContent = 'Account created successfully! Redirecting to login...';

        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      } else {
        setError(emailShell, emailErr, data.message || 'Registration failed.');
      }
    })
    .catch(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-label').textContent = 'Create Account';
      setError(pwShell, pwErr, 'Server connection failed. Please try again!');
    });
  });
}