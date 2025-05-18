/**
 * Renders user profile information into the DOM.
 * Populates banner, avatar, username, bio, and credits from user data.
 *
 * @param {Object} userData - The user data object.
 * @param {Object} [userData.banner] - The banner image object.
 * @param {string} [userData.banner.url] - The banner image URL.
 * @param {Object} [userData.avatar] - The avatar image object.
 * @param {string} [userData.avatar.url] - The avatar image URL.
 * @param {string} userData.name - The username.
 * @param {string} [userData.bio] - The user bio.
 * @param {number} [userData.credits] - The user's credit balance.
 * @returns {void}
 */
export async function renderProfile(userData) {
  if (!userData) {
    console.error("userData is null or udefined:", userData);
    return;
  }

  const bannerUrl = userData.banner?.url;
  const profileImageUrl = userData.avatar?.url;
  const username = userData.name;
  const bio = userData.bio;
  const credits = userData.credits;

  const profileBanner = document.getElementById("bannerImage");
  const profileImage = document.getElementById("profileImage");
  const usernameElement = document.getElementById("profileUsername");
  const bioElement = document.getElementById("profileBio");
  const creditsButton = document.getElementById("credits");

  if (
    !profileBanner ||
    !profileImage ||
    !usernameElement ||
    !bioElement ||
    !creditsButton
  ) {
    console.error("Some HTML elements were not found.");
    return;
  }

  usernameElement.textContent = username || "User";
  bioElement.textContent = bio || "No bio available.";
  creditsButton.textContent = `Credits: ${credits || 0}`;
  profileBanner.src = bannerUrl || "default-banner.jpg";
  profileImage.src = profileImageUrl || "default-avatar.jpg";
}
