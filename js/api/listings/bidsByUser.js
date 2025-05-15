import { API_AUCTION_PROFILES } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

export async function bidsByUser(username) {
  try {
    const response = await fetch(
      `${API_AUCTION_PROFILES}/${username}/bids?_listings=true&_bids=true`,
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
