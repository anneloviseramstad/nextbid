import { getListingById } from "../../api/listings/getListingById.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { redirectTo } from "../../router.js";

export async function displayListing(id) {
  if (!id) {
    redirectTo("/index.html");
    return;
  }

  const container = document.querySelector("#listingContainer");

  try {
    const listingData = await getListingById(id);
    const listing = listingData.data;

    if (!listing) {
      displayMessage(container, "warning", "Listing not found");
      return;
    }

    container.innerHTML = `
        <div class="h1-secondary">
          <h1>${listing.title}</h1>
        </div>
        <img class="post-id-image" src="${listing.media?.url || ""}" alt="${
      listing.media?.alt || "Post image"
    }" />
        <div class="post-body">${post.body}</div>
        <h3><strong>Author:</strong> ${listing.seller?.name || "Unknown"}</h3>
        <h3><strong>Created:</strong> ${new Date(
          post.created
        ).toLocaleString()}</h3>
        <h3><strong>Tags:</strong> ${
          listing.wins.tags.length ? listing.wins.tags.join(", ") : "No tags"
        }</h3>
        <div id="shareButton" class="share-icon" title="Share">
          <i class="fa-solid fa-link"></i>
        </div>
      `;
    const shareButton = document.getElementById("shareButton");
    shareButton.addEventListener("click", () => copyShareableUrl(id));
  } catch (error) {
    console.error("Error fetching post:", error);
    displayMessage(
      container,
      "danger",
      "An error occurred while fetching the post."
    );
  }
}

function copyShareableUrl(postId) {
  const currentUrl = window.location.href.split("?")[0];
  const shareableUrl = `${currentUrl}?id=${postId}`;

  navigator.clipboard
    .writeText(shareableUrl)
    .then(() => {
      alert("Shareable URL copied to clipboard: " + shareableUrl);
    })
    .catch((err) => {
      console.error("Error copying shareable URL:", err);
      alert("Failed to copy shareable URL.");
    });
}
