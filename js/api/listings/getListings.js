import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

export async function getListings() {
  try {
    const response = await fetch(API_AUCTION_LISTINGS, {
      headers: headers(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Unknown error occurred");
    }

    const posts = data.data ?? [];

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
}
