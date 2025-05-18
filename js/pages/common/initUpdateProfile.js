import { updateHandler } from "../../handlers/auth/updateProfile.js";

export function initUpdateProfile() {
  const updateForm = document.querySelector("#updateForm");
  if (updateForm) {
    updateForm.addEventListener("submit", updateHandler);
  }
}
