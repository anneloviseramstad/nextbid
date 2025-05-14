import { removeUserToken } from "../../utils/storage.js";

export function logOut() {
  const logoutButton = document.querySelector(".logout-button");

  if (logoutButton) {
    logoutButton.addEventListener("click", logoutHandler);
  }
}

function logoutHandler() {
  removeUserToken();
  window.location.href = "/login/index.html";
}
