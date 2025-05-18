import { router } from "./router.js";
import { authenticationStatus } from "./ui/common/navigation.js";

const loader = document.getElementById("loader");

/**
 * Initializes the app by showing loader, checking authentication status,
 * and routing to the correct page. Hides loader after completion.
 */
async function init() {
  try {
    loader.style.display = "flex";
    await authenticationStatus();
    router();
  } catch (error) {
    console.error("Error during initialization", error);
  } finally {
    loader.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("popstate", router);
