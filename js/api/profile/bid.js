import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

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
