import { createListingHandler } from "../../handlers/listings/createListing.js";

export function initCreate() {
  const createForm = document.querySelector("#createForm");
  if (!createForm) return;
  createForm.addEventListener("submit", createListingHandler);
}
