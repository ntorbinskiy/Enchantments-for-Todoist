import { addClasses } from "../helpers/addClasses";
import { SetStylesForBlockArgs } from "./unknownEstimates/unknownEstimatesActivity";

const NO_POINTS = "NO_POINTS";
const limitOfCharactersPerTask = 86;

const setStylesForNoPoints = ({
  taskElement,
  taskName,
  block,
}: SetStylesForBlockArgs): void => {
  addClasses(taskElement, "no-points-element");
  block.innerHTML = "No points entered for this task";

  block.id = NO_POINTS;

  if (taskName.length >= limitOfCharactersPerTask) {
    addClasses(block, "activity-block-span-threshold");
  }

  addClasses(block, "activity-block", "no-points-text");
};

export const findNoPointsElement = (taskItem: HTMLElement): Element | null => {
  return taskItem.querySelector(`#${NO_POINTS}`);
};

export const createNoPoints = (
  taskElement: HTMLElement,
  taskName: string
): HTMLSpanElement => {
  const block = document.createElement("span");

  const stylesForNoPointsOptions: SetStylesForBlockArgs = {
    taskElement,
    taskName,
    block,
  };
  setStylesForNoPoints(stylesForNoPointsOptions);

  return block;
};
