import { API_AUCTION_PROFILES } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

export async function editProfile(username, data) {
  if (!username) {
    throw new Error("Missing username");
  }

  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Unknown error occurred");
    }

    return json;
  } catch (error) {
    console.error("Error editing profile:", error.message);
    throw error;
  }
}
