import { getListingById } from "../../api/listings/getListingById.js";
import { displayMessage } from "../../ui/common/displayMessage.js";


export async function displayListing(id) {
  if (!id) {
    window.location.href = "/index.html";
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

    let highestBid = "No bids yet";
    if (listing.bids && listing.bids.length > 0) {
      highestBid = Math.max(...listing.bids.map((bid) => bid.amount));
    }

    container.innerHTML = `
      <img class="mb-4 w-1/2 max-h-96 object-cover rounded-sm rounded-md" src="${
        listing.media?.[0]?.url || ""
      }" alt="${listing.media?.alt || "Listing image"}" />
        <div>
          <h1 class="font-bold text-lg md:text-2xl">${listing.title}</h1>
          <div class="text-xs text-gray-400 py-2">
            <p class="text-[#D54B01]">Published by ${listing.seller?.name}</p>
            <p>${new Date(listing.created).toLocaleString()}</p>
          </div>
          <p class="mb-4 text-md">${listing.description}</p>
          <div class="text-sm text-gray-400 py-2">
            <p>Total bids: ${listing._count?.bids || "No bids yet"}</p>
            <p>Ends at: ${new Date(listing.endsAt).toLocaleString()}</p>
            <p><strong>Highest bid:</strong> ${highestBid}</p>
          </div>
          <div id="shareButton" class="share-icon" title="Share">
            <i class="fa-solid fa-link"></i>
          </div>
      </div>
    `;

    const shareButton = document.getElementById("shareButton");
    shareButton.addEventListener("click", () => copyShareableUrl(id));
  } catch (error) {
    console.error("Error fetching listing:", error);
    displayMessage(
      container,
      "danger",
      "An error occurred while fetching the listing."
    );
  }
}

function copyShareableUrl(listingId) {
  const currentUrl = window.location.href.split("?")[0];
  const shareableUrl = `${currentUrl}?id=${listingId}`;

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
