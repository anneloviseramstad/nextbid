import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Places a bid on a specific auction listing.
 *
 * @param {string} id - The ID of the listing to bid on.
 * @param {number} amount - The bid amount.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the request fails or the bid is invalid.
 */
export async function bidOnListing(id, amount) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ amount }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Unknown error occurred");
    }

    return json;
  } catch (error) {
    console.error("Error placing bid:", error.message);
    throw error;
  }
}
