import { initRegister } from "./pages/initRegister.js";
import { initLogin } from "./pages/initLogin.js";

const routes = {
  register: initRegister,
  login: initLogin,
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

  const match = pathname.match(/^\/([^/]+)\/index\.html$/);
  const page = match?.[1];

  if (page && routes[page]) {
    routes[page]();
  }
}
