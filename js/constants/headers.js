import { API_KEY } from "./api.js";
import { retrieveUserToken } from "../utils/storage.js";

/**
 * Constructs and returns standard headers for API requests,
 * including authorization and content type.
 *
 * @returns {Headers} A Headers object with necessary fields for API requests.
 */
export function headers() {
  const headers = new Headers();
  const token = retrieveUserToken();

  if (API_KEY) {
    headers.append("x-Noroff-API-KEY", API_KEY);
  }

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  headers.append("Content-Type", "application/json");

  return headers;
}
