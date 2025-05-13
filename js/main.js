import { router } from "./router.js";
import { authenticationStatus } from "./ui/common/navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  authenticationStatus();
  router();
});

window.addEventListener("popstate", router);
