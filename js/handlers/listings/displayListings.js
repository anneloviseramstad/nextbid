import { getListings } from "../../api/listings/getListings.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { filterListings } from "./filterListings.js";
import { createListingElement } from "../../components/listings/listingElement.js";
import { attachBidHandlers } from "../bids/attachBidHandlers.js";

/**
 * Fetches all listings, filters them, and displays in the container.
 * Also attaches bid handlers to the displayed listings.
 */
export async function displayListings() {
  const container = document.querySelector("#listingsContainer");

  try {
    const response = await getListings();
    const filteredListings = filterListings(response);

    container.innerHTML = "";

    filteredListings.forEach((listing) => {
      const listingElement = createListingElement(listing);
      container.appendChild(listingElement);
    });

    attachBidHandlers(container);
  } catch (error) {
    displayMessage("#message-container", "warning", error.message);
  }
}
