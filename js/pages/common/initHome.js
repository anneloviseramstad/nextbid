import { displayListings } from "../../handlers/listings/displayListings.js";

export function initHome() {
  displayListings();
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
