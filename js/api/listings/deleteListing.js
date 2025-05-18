import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Deletes an auction listing by its ID.
 *
 * @param {string} id - The ID of the listing to delete.
 * @returns {Promise<void>} Resolves if the deletion is successful.
 * @throws {Error} If the ID is missing or the request fails.
 */
export async function deleteListing(id) {
  if (!id) {
    throw new Error("ID is required.");
  }

  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting listing:", error.message);
    throw error;
  }
}
