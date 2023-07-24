/* eslint-disable */

// import '@babel/polyfill';

import { login, logout } from './login';
import { displayMap } from './map';

console.log('Hello from parcel');

// if (module.hot) {
//   module.hot.accept();
// }

// DOM ELEMENTS
const map = document.querySelector('#map');
const loginForm = document.querySelector('.form');
const logOutBtn = document.querySelector('.nav__el--logout');

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
