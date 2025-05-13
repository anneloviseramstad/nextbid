import { createListing } from "../../api/listings/createListing.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

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
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 500);
  } catch (error) {
    displayMessage(
      "#message-container",
      "warning",
      error.message || "Failed to create listing. Please try again."
    );
  }
}
