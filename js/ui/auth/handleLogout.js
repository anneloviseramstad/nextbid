import { removeUserToken } from "../../utils/storage.js";
import { redirectTo } from "../../router.js";

export function logOut() {
  const logoutButton = document.querySelector(".logout-button");

  if (logoutButton) {
    logoutButton.addEventListener("click", logoutHandler);
  }
}

function logoutHandler() {
  removeUserToken();
  redirectTo("/login/index.html");
}
