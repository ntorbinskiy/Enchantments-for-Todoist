import { UNKNOWN_ESTIMATES } from "./unknownEstimates";

interface createUnknownEstimatesArgs {
  readonly taskItem: HTMLElement;
  readonly taskTime: Element;
  readonly taskName: string;
}

interface SetStylesForUnknownEstimatesArgs extends createUnknownEstimatesArgs {
  readonly unknownEstimates: HTMLSpanElement;
}

const limitOfCharactersPerTask = 86;

const html = document.documentElement;

const themeState = html.classList.contains("theme_dark") ? "dark" : "light";

const setStylesForUnknownEstimates = ({
  taskItem,
  taskTime,
  taskName,
  unknownEstimates,
}: SetStylesForUnknownEstimatesArgs): void => {
  taskItem.style.backgroundColor =
    themeState === "light" ? "rgb(229, 246, 253)" : "rgb(7, 19, 24)";

  unknownEstimates.innerHTML = "Unknown estimates for this task";

  taskTime.id = UNKNOWN_ESTIMATES;

  if (taskName.length >= limitOfCharactersPerTask) {
    unknownEstimates.style.left = "64px";
  }

  unknownEstimates.style.fontSize = "11px";
  unknownEstimates.style.fontWeight = "500";
  unknownEstimates.style.fontFamily = "inherit";
  unknownEstimates.style.color =
    themeState === "light" ? "rgb(1, 67, 97)" : "rgb(184, 231, 251)";
  unknownEstimates.style.position = "relative";
  unknownEstimates.style.top = "0px";
  unknownEstimates.style.left = "0px";
};

export const createUnknownEstimatesActivity = ({
  taskItem,
  taskTime,
  taskName,
}: createUnknownEstimatesArgs): HTMLSpanElement => {
  const unknownEstimates = document.createElement("span");

  const stylesForUnknownEstimatesOptions = {
    taskItem,
    taskTime,
    taskName,
    unknownEstimates,
  };
  setStylesForUnknownEstimates(stylesForUnknownEstimatesOptions);

  return unknownEstimates;
};
