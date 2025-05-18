import { handleRegister } from "../../ui/auth/handleRegister.js";

/**
 * Initializes registration form by attaching submit event listener to handle registration.
 */
export function initRegister() {
  const registerForm = document.querySelector("#registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
}
