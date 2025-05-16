import {
  isAuthenticated,
  retrieveUsername,
  removeUserToken,
  removeUsername,
} from "../../utils/storage.js";
import { logOut } from "../auth/handleLogout.js";
import { getProfile } from "../../api/profile/getProfile.js";

export async function authenticationStatus() {
  updateNavigation();

  const username = retrieveUsername();
  const creditsButton = document.querySelector("#credits");
  const profileLink = document.querySelector("#profileLink");

  if (!username) return;

  try {
    const profile = await getProfile(username);
    const credits = profile?.data?.credits || 0;

    if (creditsButton) {
      creditsButton.textContent = `Credits: ${credits}`;
      creditsButton.style.display = "inline";
    }

    if (profileLink) {
      profileLink.innerHTML = `${username} | 
        <span class="bg-[#D8D8D8] text-[#454545] px-2 py-1 rounded-full text-sm font-semibold shadow-sm hover:bg-yellow-500">
          ${credits} credits
        </span>`;
      profileLink.classList.add("text-[#454545]", "p-2", "w-full");
    }
  } catch (error) {
    console.error("Failed to fetch user credits:", error);
  }
}

export function updateNavigation() {
  const loginLink = document.querySelector("#loginLink");
  const registerLink = document.querySelector("#registerLink");
  const profileLink = document.querySelector("#profileLink");
  const usernameSpan = document.querySelector("#username");
  const creditsButton = document.querySelector("#credits");
  const logoutButton = document.querySelector(".logout-button");

  const username = retrieveUsername();
  const loggedIn = isAuthenticated();

  if (loggedIn) {
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (profileLink) profileLink.style.display = "inline";
    if (usernameSpan) usernameSpan.textContent = username || "User";
    if (creditsButton) creditsButton.style.display = "inline";

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
    if (creditsButton) creditsButton.style.display = "none";
  }
}
