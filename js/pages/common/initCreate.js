import { createListingHandler } from "../../handlers/listings/createListing.js";

export function initCreate() {
  const createForm = document.querySelector("#createForm"); // evt. mer spesifikt hvis du har flere
  if (!createForm) return;
  createForm.addEventListener("submit", createListingHandler); // ✅ riktig
}
