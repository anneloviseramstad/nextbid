import { createListing } from "../../api/listings/createListing.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

/**
 * Handles the form submission to create a new listing.
 * Collects form data, processes it, and calls createListing API.
 * Shows success or error messages and redirects on success.
 *
 * @param {Event} event - The form submission event.
 */
export async function createListingHandler(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const formFields = Object.fromEntries(formData);
  const tagsArray = formFields.tags
    ? formFields.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const data = {
    title: formFields.title.trim(),
    description: formFields.description.trim(),
    endsAt: new Date(formFields.endsAt).toISOString(),
    tags: tagsArray,
    media: formFields.image
      ? [{ url: formFields.image.trim(), alt: formFields.title.trim() }]
      : [],
  };

  try {
    await createListing(data);
    displayMessage(
      "#message-container",
      "success",
      "Listing created successfully!"
    );
    alert("Listing created successfully! Redirecting to profile page...");
    window.location.href = "/profile/index.html";
  } catch (error) {
    displayMessage(
      "#message-container",
      "warning",
      error.message || "Failed to create listing. Please try again."
    );
  }
}
