import { router } from "./router.js";
import { authenticationStatus } from "./ui/common/navigation.js";

const loader = document.getElementById("loader");

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
