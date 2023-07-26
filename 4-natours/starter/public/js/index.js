import 'core-js/stable';
import { login, logout } from './login';
import { displayMap } from './map';
import { updateSettings } from './updateSettings';

console.log('Hello from parcel');

// if (module.hot) {
//   module.hot.accept();
// }

// DOM ELEMENTS
const map = document.querySelector('#map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateUserDataForm = document.querySelector('.form-user-data');
const updateUserPasswordForm = document.querySelector('.form-user-password');

// DELEGATION
if (map) {
  const locations = JSON.parse(map.dataset.locations);
  console.log(locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (updateUserDataForm) {
  updateUserDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = updateUserDataForm.querySelector('#name').value;
    const email = updateUserDataForm.querySelector('#email').value;
    updateSettings({ name, email }, 'data');
  });
}

if (updateUserPasswordForm) {
  updateUserPasswordForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const currentPassword =
      updateUserPasswordForm.querySelector('#password-current').value;
    const newPassword = updateUserPasswordForm.querySelector('#password').value;
    const newPasswordConfirm =
      updateUserPasswordForm.querySelector('#password-confirm').value;
    await updateSettings(
      { currentPassword, newPassword, newPasswordConfirm },
      'password',
    );

    updateUserPasswordForm.querySelector('#password-current').value = '';
    updateUserPasswordForm.querySelector('#password').value = '';
    updateUserPasswordForm.querySelector('#password-confirm').value = '';

    document.querySelector('.btn--save-password').textContent = 'Updating...';
  });
}
