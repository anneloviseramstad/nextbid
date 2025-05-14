import { API_AUCTION_LISTINGS } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

export async function editListing(id, data) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers(),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Unknown error occurred");
    }

    return json;
  } catch (error) {
    console.error("Error editing post:", error.message);
    throw error;
  }
}
