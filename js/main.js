import { router } from "./router.js";
import { authenticationStatus } from "./ui/common/navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  authenticationStatus();
  router(); // init route on first load
});

window.addEventListener("popstate", router); // ← nødvendig for navigering med tilbake-/fremknapp
