/* ==========================================================
   login.js — Kishan - Tech Authentication Logic (User & Admin)
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

const tabUser    = document.getElementById('tabUser');
const tabAdmin   = document.getElementById('tabAdmin');
const idLabel    = document.getElementById('idLabel');
const authHeading = document.getElementById('authHeading');
const authSub     = document.getElementById('authSub');
const authEyebrow = document.getElementById('authEyebrow');
const socialSection = document.getElementById('socialAuthSection');
const userExtraRow  = document.getElementById('userExtraRow');

let currentMode = 'user'; // 'user' | 'admin'

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isPw = pwInput.type === 'password';
    pwInput.type = isPw ? 'text' : 'password';
    toggleBtn.textContent = isPw ? 'Hide' : 'Show';
    toggleBtn.setAttribute('aria-label', isPw ? 'Hide password' : 'Show password');
  });
}

function setMode(mode) {
  currentMode = mode;
  setError(emailShell, emailErr, '');
  setError(pwShell, pwErr, '');
  emailInput.value = '';
  pwInput.value = '';

  if (mode === 'admin') {
    tabAdmin.style.background = 'linear-gradient(120deg, #ffd36b, #7bd66f)';
    tabAdmin.style.color = '#10231f';
    tabUser.style.background = 'transparent';
    tabUser.style.color = '#C9D6D2';

    authEyebrow.textContent = '⚙️ Administrator Portal';
    authHeading.innerHTML = 'Admin <span class="auth-accent">Login</span>';
    authSub.textContent = 'Enter system credentials to manage crops and platform settings.';
    idLabel.textContent = 'Admin User ID';
    emailInput.placeholder = 'e.g. Kishan Tech';
    submitBtn.querySelector('.btn-label').textContent = 'Login as Admin';

    if (socialSection) socialSection.style.display = 'none';
    if (userExtraRow) userExtraRow.style.display = 'none';
  } else {
    tabUser.style.background = 'linear-gradient(120deg, #ffd36b, #7bd66f)';
    tabUser.style.color = '#10231f';
    tabAdmin.style.background = 'transparent';
    tabAdmin.style.color = '#C9D6D2';

    authEyebrow.textContent = '🌾 Member Sign In';
    authHeading.innerHTML = 'Welcome back to <span class="auth-accent">Kishan&nbsp;·&nbsp;Tech</span>';
    authSub.textContent = 'Sign in to save your favourite crops, track seasons, and access your dashboard.';
    idLabel.textContent = 'Email or phone';
    emailInput.placeholder = 'you@example.com';
    submitBtn.querySelector('.btn-label').textContent = 'Sign In';

    if (socialSection) socialSection.style.display = 'block';
    if (userExtraRow) userExtraRow.style.display = 'flex';
  }
}

if (tabUser) tabUser.addEventListener('click', () => setMode('user'));
if (tabAdmin) tabAdmin.addEventListener('click', () => setMode('admin'));

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
    if (emailShell.classList.contains('error')) {
      setError(emailShell, emailErr, '');
    }
  });
}

if (pwInput) {
  pwInput.addEventListener('input', () => {
    if (pwShell.classList.contains('error')) {
      setError(pwShell, pwErr, '');
    }
  });
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const enteredId = emailInput.value.trim();
    const enteredPw = pwInput.value;

    // ================= ADMIN LOGIN BRANCH =================
    if (currentMode === 'admin') {
      let ok = true;
      if (!enteredId) {
        setError(emailShell, emailErr, 'Kripya Admin User ID enter karein.');
        ok = false;
      }
      if (!enteredPw) {
        setError(pwShell, pwErr, 'Kripya Password enter karein.');
        ok = false;
      }
      if (!ok) return;

      if (enteredId === 'Kishan Tech' && enteredPw === 'admin123') {
        statusBox.classList.add('show');
        statusBox.style.borderColor = 'rgba(111,191,115,.35)';
        statusBox.style.color = '#B7E0BA';
        statusBox.textContent = 'Admin login successful! Opening dashboard…';

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('userProfile', JSON.stringify({ 
          name: 'Admin (Kishan Tech)', 
          email: 'admin@kishantech.com', 
          avatar: '' 
        }));

        setTimeout(() => {
          window.location.href = '../index.html#admin';
        }, 800);
      } else {
        setError(pwShell, pwErr, 'Wrong User ID or Password! (ID: Kishan Tech, Pass: admin123)');
      }
      return;
    }

    // ================= NORMAL USER LOGIN BRANCH =================
    let ok = true;
    if (!validLogin(enteredId)) {
      setError(emailShell, emailErr, 'Enter a valid email address.');
      ok = false;
    } else {
      setError(emailShell, emailErr, '');
    }

    if (enteredPw.length < 6) {
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: enteredId,
        password: enteredPw
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
        localStorage.removeItem('isAdmin'); // normal user
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