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

  if (!profileBanner || !profileImage || !usernameElement || !bioElement || !creditsButton) {
    console.error("Some HTML elements were not found.");
    return;
  }

  usernameElement.textContent = username || "User";
  bioElement.textContent = bio || "No bio available.";
  creditsButton.textContent = `Credits: ${credits || 0}`;
  profileBanner.src = bannerUrl || "default-banner.jpg";
  profileImage.src = profileImageUrl || "default-avatar.jpg";
}
