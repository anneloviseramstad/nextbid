import { deleteListing } from "../../api/listings/deleteListing.js";

export async function deleteListingHandler(id) {
  const listingId = event.target.dataset.listingId;

  if (!listingId) {
    console.error("Listing ID is required.");
    return;
  }

  const confirmDelete = confirm(
    "Are you sure you want to delete this listing?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const success = await deleteListing(listingId);

    if (success) {
      alert("Listing deleted successfully.");
      window.location.href = "./profile/index.html";

      const listingElement = document.getElementById(`listing-${listingId}`);
      if (listingElement) {
        listingElement.remove();
      }
    }
  } catch (error) {
    console.error("Error deleting listing:", error.message);
    alert("Failed to delete listing. Please try again.");
  }
}
