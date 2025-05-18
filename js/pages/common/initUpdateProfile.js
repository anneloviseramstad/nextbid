import { updateHandler } from "../../handlers/auth/updateProfile.js";

/**
 * Initializes the update profile page by attaching the submit event handler to the update form.
 */
export function initUpdateProfile() {
  const updateForm = document.querySelector("#updateForm");
  if (updateForm) {
    updateForm.addEventListener("submit", updateHandler);
  }
}
