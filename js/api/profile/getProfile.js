import { API_AUCTION_PROFILES } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Fetches a user's profile by username.
 * Includes the user's listings and bids in the response.
 *
 * @param {string} username - The username of the profile to retrieve.
 * @returns {Promise<Object>} The user's profile data from the API.
 * @throws {Error} If the username is missing or the request fails.
 */
export async function getProfile(username) {
  if (!username) {
    throw new Error("Missing username");
  }

  try {
    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}?_listings=true&_bids=true`,
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
    console.error("Error fetching profile:", error.message);
    throw error;
  }
}
