const USER_TOKEN = "userToken";
const USERNAME = "username";

// Store and retrieve data

function storeData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function retrieveData(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Clear storage

export function clearStorage() {
  localStorage.clear();
}

// Store and retrieve user token

export function storeUserToken(token) {
  storeData(USER_TOKEN, token);
}

export function retrieveUserToken() {
  return retrieveData(USER_TOKEN);
}

// Checked if user is authenticated
export function isAuthenticated() {
  return !!retrieveUserToken();
}

// Store and retrieve username

export function storeUsername(name) {
  storeData(USERNAME, name);
}

export function retrieveUsername() {
  return retrieveData(USERNAME);
}

// Clear data from localstorage
export function removeData(key) {
  localStorage.removeItem(key);
}

export function removeUserToken() {
  removeData(USER_TOKEN);
}

export function removeUsername() {
  removeData(USERNAME);
}
