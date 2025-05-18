import { API_AUCTION_PROFILES } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Fetches all auction listings created by a specific user.
 * Includes related bids and seller information.
 *
 * @param {string} username - The username whose listings to retrieve.
 * @returns {Promise<Object>} The user's listings data from the API.
 * @throws {Error} If the request fails.
 */
export async function listingsByUser(username) {
  try {
    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}/listings?_bids=true&_seller=true`,
      {
        headers: headers(),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Unknown error occurred");
    }

    return json;
  } catch (error) {
    console.error("Error fetching posts by profile:", error.message);
    throw error;
  }
}
