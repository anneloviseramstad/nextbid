import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

export async function getListingById(id) {
  if (!id) {
    throw new Error("ID is required.");
  }

  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}/${id}?_bids=true&_seller=true`,
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
    console.error("Error fetching listings:", error.message);
    throw error;
  }
}
