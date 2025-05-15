import { handleBidOnListing } from "../listings/bidOnListing.js";
import { displayListings } from "../listings/displayListings.js";

export function attachBidHandlers(container) {
  const buttons = container.querySelectorAll(".bid-button");

  buttons.forEach((button) => {
    const listingId = button.dataset.listingId;
    const input = container.querySelector(
      `.bid-input[data-listing-id="${listingId}"]`
    );

    button.addEventListener("click", async () => {
      const amount = Number(input.value);

      if (!amount || amount <= 0) {
        return alert("Please enter a valid bid amount.");
      }

      try {
        await handleBidOnListing(listingId, amount);

        alert("Bid submitted successfully!");
        input.value = "";

        await displayListings();
      } catch (error) {
        alert("Error placing bid: " + error.message);
      }
    });
  });
}
