import { UNKNOWN_ESTIMATES } from "./unknownEstimates";

interface createUnknownEstimatesArgs {
  readonly taskElement: HTMLElement;
  readonly taskName: string;
}

interface SetStylesForUnknownEstimatesArgs extends createUnknownEstimatesArgs {
  readonly unknownEstimates: HTMLSpanElement;
}

const limitOfCharactersPerTask = 86;

const setStylesForUnknownEstimates = ({
  taskElement,
  taskName,
  unknownEstimates,
}: SetStylesForUnknownEstimatesArgs): void => {
  //   taskElement.style.backgroundColor = "rgb(7, 19, 24)";
  taskElement.className = "unknown-estimates-task-element";

  unknownEstimates.innerHTML = "Unknown estimates for this task";

  unknownEstimates.className = UNKNOWN_ESTIMATES;
  if (taskName.length >= limitOfCharactersPerTask) {
    unknownEstimates.style.left = "64px";
  }

  unknownEstimates.style.fontSize = "11px";
  unknownEstimates.style.fontWeight = "500";
  unknownEstimates.style.fontFamily = "inherit";
  unknownEstimates.style.color = "rgb(184, 231, 251)";
  unknownEstimates.style.position = "relative";
  unknownEstimates.style.top = "0px";
  unknownEstimates.style.left = "0px";
};

export const createUnknownEstimatesActivity = (
  taskElement: HTMLElement,
  taskName: string
): HTMLSpanElement => {
  const unknownEstimates = document.createElement("span");

  const stylesForUnknownEstimatesOptions: SetStylesForUnknownEstimatesArgs = {
    taskElement,
    taskName,
    unknownEstimates,
  };
  setStylesForUnknownEstimates(stylesForUnknownEstimatesOptions);

  return unknownEstimates;
};
