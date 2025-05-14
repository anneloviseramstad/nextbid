import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

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
