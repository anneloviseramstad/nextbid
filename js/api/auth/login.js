import { AUTH_LOGIN_URL } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";
import { storeUserToken } from "../../utils/storage.js";
import { storeUsername } from "../../utils/storage.js";

/**
 * Logs in a user with the provided details.
 * Sends a POST request to the authentication endpoint.
 *
 * @param {Object} userDetails - The user's login information.
 * @param {string} userDetails.name - The username.
 * @param {string} userDetails.password - The user's password.
 * @returns {Promise<Object>} The response data from the login request.
 * @throws {Error} If the login request fails.
 */

export async function loginUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: headers(),
    };
    const response = await fetch(AUTH_LOGIN_URL, fetchOptions);
    const json = await response.json();

    if (!response.ok) {
      const errorMessage = json.errors?.[0]?.message || "Unknown login error.";
      throw new Error(errorMessage);
    }

    const accessToken = json.data.accessToken;
    storeUserToken(accessToken);
    storeUsername(userDetails.name);

    return json;
  } catch (error) {
    throw error;
  }
}
