import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

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
