import { initRegister } from "./pages/auth/initRegister.js";
import { initLogin } from "./pages/auth/initLogin.js";
import { initHome } from "./pages/common/initHome.js";
import { initListingPage } from "./pages/common/initListing.js";
import { initCreate } from "./pages/common/initCreate.js";
import { initProfile } from "./pages/common/initProfile.js";
import { initEdit } from "./pages/common/initEdit.js";
import { initUpdateProfile } from "./pages/common/initUpdateProfile.js";

const routes = {
  "": initHome,
  register: initRegister,
  login: initLogin,
  details: initListingPage,
  create: initCreate,
  profile: initProfile,
  edit: initEdit,
  update: initUpdateProfile,
};

export function router() {
  const pathname = window.location.pathname;
  const page = pathname.split("/")[1];

  if (!page || pathname === "/" || pathname === "/index.html") {
    routes[""]();
  } else if (routes[page]) {
    routes[page]();
  } else {
    console.warn("No route for path:", pathname);
  }
}
