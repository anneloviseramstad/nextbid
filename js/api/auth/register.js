import { AUTH_REGISTER_URL } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

export async function registerUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: headers(),
    };
    const response = await fetch(AUTH_REGISTER_URL, fetchOptions);
    const json = await response.json();

    if (!response.ok) {
      const errorMessage =
        json.errors?.[0]?.message || "Unknown registration error.";
      throw new Error(errorMessage);
    }
    return json;
  } catch (error) {
    throw error;
  }
}
