import { loginUser } from "../../api/auth/login.js";
import { displayMessage } from "../common/displayMessage.js";
import { storeUserToken, storeUsername } from "../../utils/storage.js";

export async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  try {
    // Hent data direkte fra loginUser responsen
    const { data } = await loginUser(userData); // data kommer fra loginUser
    console.log(data);
    const { accessToken, name } = data; // Hent accessToken og name fra data

    // Lagre token og username
    storeUserToken(accessToken);
    console.log("token stored.");
    storeUsername(name);
    console.log("username stored.");

    displayMessage("#message-container", "success", "Login successful.");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 500);
  } catch (error) {
    // Håndter feilmeldinger
    displayMessage(
      "#message-container",
      "warning",
      error.message || "Failed to log in. Please try again."
    );
  }
}
