import { getListingById } from "../../api/listings/getListingById.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

export async function displayListing(id) {
  if (!id) {
    window.location.href = "/index.html";
    return;
  }

  const listingContainer = document.querySelector("#listingContainer");
  const bidsContainer = document.querySelector("#bidContainer");

  try {
    const listingData = await getListingById(id);
    const listing = listingData.data;

    if (!listing) {
      displayMessage(listingContainer, "warning", "Listing not found");
      return;
    }

    let highestBid = "No bids yet";
    if (listing.bids && listing.bids.length > 0) {
      highestBid = Math.max(...listing.bids.map((bid) => bid.amount));
    }

    listingContainer.innerHTML = `
      <div class="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 my-8 md:my-12 mx-4 md:mx-8">
        <img class="mb-4 w-1/2 max-h-96 object-cover rounded-md" src="${
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
        </div>
      </div>
    `;

    const bids = listing.bids;

    if (bids && bids.length > 0) {
      const sortedBids = [...bids].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );

      bidsContainer.innerHTML = `
        <div class="bg-gray-100 p-4 rounded-md mx-4 md:mx-8 mb-4 md:mb-8">
          <h6 class="font-semibold text-sm mb-2">Recent bids:</h6>
          ${sortedBids
            .slice(0, 3)
            .map(
              (bid) => `
              <p class="text-xs text-gray-700 bg-white rounded p-2 mt-1 shadow-sm">
                $${bid.amount} - by ${bid.bidder.name}
              </p>
            `
            )
            .join("")}
        </div>
      `;
    } else {
      bidsContainer.innerHTML = `
        <div class="bg-gray-100 p-4 rounded-md mx-8 mb-8">
          <h6 class="font-semibold text-sm mb-2">Recent bids:</h6>
          <p class="text-xs text-gray-500">No bids yet.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error fetching listing:", error);
    displayMessage(
      listingContainer,
      "danger",
      "An error occurred while fetching the listing."
    );
  }
}
