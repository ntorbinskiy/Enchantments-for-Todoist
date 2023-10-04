import mutationObserver from "./mutationObserver";
import runApp from "./modules/runApp";

const bootstrapApp = (): void => {
  runApp();
  mutationObserver();
};

const interval = setInterval(() => {
  const homeButton = document.querySelector("button.home_btn");
  if (homeButton) {
    bootstrapApp();
    clearInterval(interval);
  }
}, 100);
