import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Edits an existing auction listing with new data.
 *
 * @param {string} id - The ID of the listing to edit.
 * @param {Object} data - The updated listing data.
 * @param {string} [data.title] - The updated title (optional).
 * @param {string} [data.description] - The updated description (optional).
 * @param {string[]} [data.media] - Updated array of media URLs (optional).
 * @param {string} [data.endsAt] - Updated end time in ISO format (optional).
 * @returns {Promise<Object>} The updated listing data from the API.
 * @throws {Error} If the request fails or the listing ID is invalid.
 */
export async function editListing(id, data) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers(),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Unknown error occurred");
    }

    return json;
  } catch (error) {
    console.error("Error editing post:", error.message);
    throw error;
  }
}
