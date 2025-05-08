import { handleLogin } from "../../ui/auth/handleLogin.js";

export function initLogin() {
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
}
