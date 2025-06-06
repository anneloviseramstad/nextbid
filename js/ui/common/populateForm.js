import { getListingById } from "../../api/listings/getListingById.js";

/**
 * Fetches listing data by ID and fills the edit form fields with it.
 * @param {string} id - The ID of the listing to edit.
 */
export async function populateEditForm(id) {
  try {
    const listing = await getListingById(id);
    const data = listing.data;

    document.getElementById("title").value = data.title || "";
    document.getElementById("description").value = data.description || "";
    document.getElementById("tags").value = data.tags?.join(", ") || "";
    document.getElementById("image").value = data.media?.[0]?.url || "";
    document.getElementById("endsAt").value = data.endsAt
      ? data.endsAt.split("T")[0]
      : "";
  } catch (error) {
    console.error("Failed to populate form:", error.message);
  }
}
