import { API_AUCTION_PROFILES } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Updates a user's profile with the provided data.
 *
 * @param {string} username - The username of the profile to edit.
 * @param {Object} data - The updated profile data.
 * @param {string[]} [data.avatar] - Optional array of avatar URLs.
 * @returns {Promise<Object>} The updated profile data from the API.
 * @throws {Error} If the username is missing or the request fails.
 */
export async function editProfile(username, data) {
  if (!username) {
    throw new Error("Missing username");
  }

  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Unknown error occurred");
    }

    return json;
  } catch (error) {
    console.error("Error editing profile:", error.message);
    throw error;
  }
}
