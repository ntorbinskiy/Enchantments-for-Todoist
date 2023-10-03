import mutationObserver from "./mutationObserver";
import runApp from "./modules/runApp";

import "../public/icons/icon16.png";
import "../public/icons/icon32.png";
import "../public/icons/icon48.png";
import "../public/icons/icon128.png";

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
