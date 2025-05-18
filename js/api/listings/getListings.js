import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Fetches a list of auction listings with associated bids and seller information.
 * Sorted by creation date in descending order and limited to 100 results.
 *
 * @returns {Promise<Object[]>} An array of listing objects from the API.
 * @throws {Error} If the request fails.
 */
export async function getListings() {
  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}?_bids=true&_seller=true&sort=created&_sortOrder=desc&page=1&limit=100`,
      {
        headers: headers(),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Unknown error occurred");
    }

    const listings = data.data ?? [];
    return listings;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
}
