import { handleLogin } from "../../ui/auth/handleLogin.js";

/**
 * Initializes login form by attaching submit event listener to handle login.
 */
export function initLogin() {
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
}
