import { displayListings } from "../../handlers/listings/displayListings.js";
import { isAuthenticated } from "../../utils/storage.js";

export function initHome() {
  displayListings();

  const getStartedBtn = document.getElementById("getStartedBtn");
  if (getStartedBtn) {
    getStartedBtn.href = isAuthenticated()
      ? "/create/index.html"
      : "/register/index.html";
  }

  const inputs = ["searchInput", "searchUsernameInput", "sortByTag"];
  inputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        displayListings();
      });
    }
  });
}
