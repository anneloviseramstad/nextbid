import { handleBidOnListing } from "../listings/bidOnListing.js";
import { displayListings } from "../listings/displayListings.js";

/**
 * Attaches click event listeners to all bid buttons within a given container.
 *
 * When a bid button is clicked, it retrieves the associated input value,
 * validates the bid amount, and submits the bid using `handleBidOnListing`.
 * Displays success or error messages and reloads the listings on success.
 *
 * @param {HTMLElement} container - The DOM element containing bid buttons and inputs.
 */
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
