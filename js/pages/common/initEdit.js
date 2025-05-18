import { editListingHandler } from "../../handlers/listings/editListing.js";
import { populateEditForm } from "../../ui/common/populateForm.js";

/**
 * Initializes the edit listing form:
 * - Sets the listing ID from the URL query string.
 * - Populates the form with existing listing data.
 * - Attaches the submit event handler for editing the listing.
 */
export function initEdit() {
  const form = document.getElementById("editForm");
  const id = new URLSearchParams(window.location.search).get("id");
  form.dataset.id = id;

  populateEditForm(id);

  form.addEventListener("submit", (event) => {
    editListingHandler(event, id);
  });
}
