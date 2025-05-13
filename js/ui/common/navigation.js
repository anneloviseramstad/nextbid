import {
  isAuthenticated,
  retrieveUsername,
  removeUserToken,
  removeUsername,
} from "../../utils/storage.js";
import { logOut } from "../auth/handleLogout.js";

export function updateNavigation() {
  const loginLink = document.querySelector("#loginLink");
  const registerLink = document.querySelector("#registerLink");
  const profileLink = document.querySelector("#profileLink");
  const usernameSpan = document.querySelector("#username");
  const logoutButton = document.querySelector(".logout-button");

  const username = retrieveUsername();
  const loggedIn = isAuthenticated();

  if (loggedIn) {
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (profileLink) {
      profileLink.style.display = "inline";
      profileLink.textContent = `Welcome, ${username || "User"}`;
    }
    if (usernameSpan) {
      usernameSpan.textContent = username || "User";
    }
    if (logoutButton) {
      logoutButton.style.display = "inline";
      const newLogoutButton = logoutButton.cloneNode(true);
      logoutButton.parentNode.replaceChild(newLogoutButton, logoutButton);

      newLogoutButton.addEventListener("click", () => {
        removeUserToken();
        removeUsername();
        logOut();
      });
    }
  } else {
    if (loginLink) loginLink.style.display = "block";
    if (registerLink) registerLink.style.display = "block";
    if (profileLink) profileLink.style.display = "none";
    if (logoutButton) logoutButton.style.display = "none";
  }
}

export function authenticationStatus() {
  updateNavigation();
}
