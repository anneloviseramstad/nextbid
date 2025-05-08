import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

export async function getListings() {
  try {
    // Legg til _bids=true&_seller=true i URL-en for å hente relaterte data
    const response = await fetch(
      `${API_AUCTION_LISTINGS}?_bids=true&_seller=true`,
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
    console.error("Error fetching listings:", error.message);
    throw error;
  }
}
