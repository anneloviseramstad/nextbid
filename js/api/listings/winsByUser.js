import { API_AUCTION_PROFILES } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Fetches all auctions won by a specific user.
 * Includes related listings and bid information.
 *
 * @param {string} username - The username to fetch win data for.
 * @returns {Promise<Object>} The user's auction wins from the API.
 * @throws {Error} If the request fails.
 */
export async function winsByUser(username) {
  try {
    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}/wins?_listings=true&_bids=true`,
      {
        method: "GET",
        headers: headers(),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Unknown error occurred");
    }

    return json;
  } catch (error) {
    console.error("Error fetching bids by profile:", error.message);
    throw error;
  }
}
