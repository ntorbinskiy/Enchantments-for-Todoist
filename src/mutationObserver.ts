import runApp from "./modules/runApp";

const config = {
  childList: true,
  subtree: true,
};

const callback = (
  mutationList: MutationRecord[],
  _observer: MutationObserver
) => {
  // ⬆️ the second arg is required
  for (const mutation of mutationList) {
    if (mutation) {
      runApp();
    }
  }
};

const observer = new MutationObserver(callback);

const observeScript = (): void => {
  observer.observe(document.documentElement, config);
};

export default observeScript;
