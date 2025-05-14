import { editListingHandler } from "../../handlers/listings/editListing.js";
import { populateEditForm } from "../../ui/common/populateForm.js";

export function initEdit() {
  const form = document.getElementById("editForm");
  const id = new URLSearchParams(window.location.search).get("id");
  form.dataset.id = id;

  populateEditForm(id);

  form.addEventListener("submit", (event) => {
    editListingHandler(event, id);
  });
}
