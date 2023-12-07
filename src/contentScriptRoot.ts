import mutationObserver from "./mutationObserver";
import runApp from "./modules/runApp";

const bootstrapApp = (): void => {
  runApp();
  mutationObserver();
};

const interval = setInterval(() => {
  const homeButton = document.querySelector(".app-sidebar-container");
  if (homeButton) {
    bootstrapApp();
    clearInterval(interval);
  }
}, 100);
