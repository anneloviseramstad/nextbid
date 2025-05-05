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
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
