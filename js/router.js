import { initRegister } from "./pages/auth/initRegister.js";
import { initLogin } from "./pages/auth/initLogin.js";
import { initHome } from "./pages/common/initHome.js";
import { initListingPage } from "./pages/common/initListing.js";

const routes = {
  "": initHome,
  register: initRegister,
  login: initLogin,
  listings: initListingPage,
  // legg til flere ruter her f.eks.:
  // profile: initProfile,
  // settings: initSettings,
};

export function redirectTo(path) {
  if (!path.endsWith(".html")) {
    path = `${path}/index.html`;
  }
  window.location.href = path;
}

export function router() {
  const pathname = window.location.pathname;
  const page = pathname.split("/")[1]; // Tar første del av pathen som page

  if (page && routes[page]) {
    routes[page]();
  } else if (pathname === "/index.html") {
    routes[""](); // Hvis du er på index.html, kall initHome()
  }
}
