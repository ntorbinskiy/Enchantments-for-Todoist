import { addClasses } from "../../helpers/addClasses";
import { UNKNOWN_ESTIMATES, unknownEstimatesMessage } from "./unknownEstimates";

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
  block.innerHTML = unknownEstimatesMessage;

  addClasses(taskElement, "activity-block", "unknown-estimates-task-element");
  addClasses(block, "unknown-estimates-text");

  if (taskName.length >= limitOfCharactersPerTask) {
    addClasses(block, "activity-block-span-threshold");
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
