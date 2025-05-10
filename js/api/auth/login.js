import { AUTH_LOGIN_URL } from "../../constants/api.js";
import { headers } from "../../constants/headers.js";
import { storeUserToken } from "../../utils/storage.js";
import { storeUsername } from "../../utils/storage.js";

export async function loginUser(userDetails) {
  try {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: headers(),
    };
    const response = await fetch(AUTH_LOGIN_URL, fetchOptions);
    const json = await response.json();
    console.log(json.data.accessToken);

    if (!response.ok) {
      const errorMessage = json.errors?.[0]?.message || "Unknown login error.";
      throw new Error(errorMessage);
    }

    const accessToken = json.data.accessToken;
    storeUserToken(accessToken);
    storeUsername(userDetails.name);
    console.log(json);

    return json;
  } catch (error) {
    throw error;
  }
}
