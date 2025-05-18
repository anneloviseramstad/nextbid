import { retrieveUsername } from "../../utils/storage.js";
import { editProfile } from "../../api/profile/editProfile.js";

export async function updateHandler(event) {
  event.preventDefault();
  const username = retrieveUsername();
  const messageContainer = document.getElementById("message-container");

  try {
    const bio = event.target.bio.value.trim();
    const avatarUrl = event.target["avatar-url"].value.trim();
    const bannerUrl = event.target["banner-url"].value.trim();

    const profileData = {
      bio,
      avatar: {
        url: avatarUrl,
        alt: "Avatar image",
      },
      banner: {
        url: bannerUrl,
        alt: "Banner image",
      },
    };

    await editProfile(username, profileData);
    messageContainer.innerHTML = `<p class="text-green-500">Profile updated!</p>`;

    // Optional redirect
    setTimeout(() => {
      window.location.href = `/profile/index.html`;
    }, 1000);
  } catch (error) {
    console.error("Failed to update profile:", error);
    messageContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
  }
}
