import { removeUserToken } from "../../utils/storage.js";

/**
 * Attaches click event to the logout button to handle user logout.
 */
export function logOut() {
  const logoutButton = document.querySelector(".logout-button");

  if (logoutButton) {
    logoutButton.addEventListener("click", logoutHandler);
  }
}

/**
 * Clears the user token and redirects to the login page.
 * @private
 */
function logoutHandler() {
  removeUserToken();
  window.location.href = "/login/index.html";
}
