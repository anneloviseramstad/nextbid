import { displayListing } from "../../handlers/listings/displayListing.js";

/**
 * Initializes the listing page by extracting the listing ID from the URL
 * and displaying the corresponding listing details.
 */
export function initListingPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  displayListing(id);
}
