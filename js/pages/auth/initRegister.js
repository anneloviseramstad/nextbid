import { handleRegister } from "../../ui/auth/handleRegister.js";

export function initRegister() {
  const registerForm = document.querySelector("#registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
}
