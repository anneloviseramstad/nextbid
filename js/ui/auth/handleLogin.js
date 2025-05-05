import { loginUser } from "../../api/auth/login.js";
import { displayMessage } from "../common/displayMessage.js";
import { storeUserToken, storeUsername } from "../../utils/storage.js";
import { redirectTo } from "../../router.js";

export async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  try {
    const { data } = await loginUser(userData);
    const { accessToken, name } = data;

    storeUserToken(accessToken);
    console.log("token stored.");
    storeUsername(name);
    console.log("username stored.");

    displayMessage("#message-container", "success", "Login successful.");

    redirectTo("/index.html");
  } catch (error) {
    displayMessage(
      "#message-container",
      "warning",
      error.message || "Failed to log in. Please try again."
    );
  }
}
