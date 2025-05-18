import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Creates a new auction listing with the given details.
 *
 * @param {Object} listing - The listing details.
 * @param {string} listing.title - The title of the listing.
 * @param {string} listing.description - The description of the item.
 * @param {string[]} listing.media - Array of media URLs for the listing.
 * @param {string} listing.endsAt - ISO string of the listing's end time.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the request fails or returns an error.
 */
export async function createListing({ title, description, media, endsAt }) {
  try {
    const data = JSON.stringify({ title, description, media, endsAt });

    const response = await fetch(API_AUCTION_LISTINGS, {
      method: "POST",
      body: data,
      headers: headers(),
    });

    const json = await response.json();

    if (!response.ok) {
      const errorMessage =
        json.errors?.[0]?.message || "Unknown error occurred";
      throw new Error(errorMessage);
    }

    return json;
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error;
  }
}
