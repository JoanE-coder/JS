import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import { isAuthenticated } from "@/utils/session";

const routes = {
  "/": loginView,
  "/home": homeView,
};

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");

  let path = window.location.pathname;

  const view = routes[path] || loginView;

  app.innerHTML = view();
};

window.addEventListener("popstate", router);
