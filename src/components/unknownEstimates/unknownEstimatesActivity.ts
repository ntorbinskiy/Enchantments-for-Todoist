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
  //   console.log("mutation");
  unknownEstimates.id = UNKNOWN_ESTIMATES;
  taskElement.classList.add("unknown-estimates-task-element");

  unknownEstimates.innerHTML = "Unknown estimates for this task";

  unknownEstimates.classList.add("unknown-estimates-span");

  if (taskName.length >= limitOfCharactersPerTask) {
    unknownEstimates.classList.add("unknown-estimates-span-threshold");
  }
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
