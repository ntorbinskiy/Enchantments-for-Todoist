import { UNKNOWN_ESTIMATES } from "./unknownEstimates";

export interface createBlockArgs {
  readonly taskElement: HTMLElement;
  readonly taskName: string;
}

export interface SetStylesForBlockArgs extends createBlockArgs {
  readonly block: HTMLSpanElement;
}

const limitOfCharactersPerTask = 86;

const setStylesForUnknownEstimates = ({
  taskElement,
  taskName,
  block,
}: SetStylesForBlockArgs): void => {
  block.id = UNKNOWN_ESTIMATES;
  taskElement.classList.add(
    "activity-block-styles",
    "unknown-estimates-task-element"
  );

  block.innerHTML = "Unknown estimates for this task";

  block.classList.add("unknown-estimates-text");

  if (taskName.length >= limitOfCharactersPerTask) {
    block.classList.add("activity-block-span-threshold");
  }
};

export const createUnknownEstimatesActivity = (
  taskElement: HTMLElement,
  taskName: string
): HTMLSpanElement => {
  const unknownEstimates = document.createElement("span");

  const stylesForUnknownEstimatesOptions: SetStylesForBlockArgs = {
    taskElement,
    taskName,
    block: unknownEstimates,
  };
  setStylesForUnknownEstimates(stylesForUnknownEstimatesOptions);

  return unknownEstimates;
};
