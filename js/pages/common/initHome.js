import { displayListings } from "../../handlers/listings/displayListings.js";

export function initHome() {
  displayListings(); // initial load

  // Lytt etter endringer i filterfeltene
  const inputs = ["searchInput", "searchUsernameInput", "sortByTag"];

  inputs.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        displayListings(); // kjør filtrering på input
      });
    }
  });
}
