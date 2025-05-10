import { displayListing } from "../../handlers/listings/displayListing.js";

export function initListingPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  displayListing(id);
}
