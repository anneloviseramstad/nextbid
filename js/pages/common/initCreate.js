import { createListingHandler } from "../../handlers/listings/createListing.js";

/**
 * Initializes the create listing form by attaching the submit event handler.
 */
export function initCreate() {
  const createForm = document.querySelector("#createForm");
  if (!createForm) return;
  createForm.addEventListener("submit", createListingHandler);
}
