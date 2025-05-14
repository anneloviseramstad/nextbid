import { loginUser } from "../../api/auth/login.js";
import { displayMessage } from "../common/displayMessage.js";
import { storeUserToken, storeUsername } from "../../utils/storage.js";

export async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  try {
    const { data } = await loginUser(userData);
    const { accessToken, name } = data;

    storeUserToken(accessToken);
    storeUsername(name);

    alert("Login successful! Redirecting to profile page...");
    window.location.href = "/profile/index.html";
  } catch (error) {
    displayMessage(
      "#message-container",
      "warning",
      error.message || "Failed to log in. Please try again."
    );
  }
}
