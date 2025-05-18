import { AUTH_REGISTER_URL } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";

/**
 * Registers a new user with the provided details.
 * Sends a POST request to the registration endpoint.
 *
 * @param {Object} userDetails - The user's registration information.
 * @param {string} userDetails.name - The username.
 * @param {string} userDetails.password - The user's password.
 * @returns {Promise<Object>} The response data from the registration request.
 * @throws {Error} If the registration request fails.
 */

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
