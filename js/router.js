import { initRegister } from "./pages/auth/initRegister.js";
import { initLogin } from "./pages/auth/initLogin.js";
import { initHome } from "./pages/common/initHome.js";
import { initListingPage } from "./pages/common/initListing.js";

const routes = {
  "": initHome,
  register: initRegister,
  login: initLogin,
  details: initListingPage,
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
  const page = pathname.split("/")[1];

  if (!page || pathname === "/" || pathname === "/index.html") {
    routes[""](); 
  } else if (routes[page]) {
    routes[page]();
  } else {
    console.warn("Ukjent rute:", pathname);
  }
}
