import { addClasses } from "../../helpers/addClasses";
import { buttonsGroupClass } from "../../modules/projectModule";
import { UNKNOWN_ESTIMATES, unknownEstimatesMessage } from "./unknownEstimates";

const setStylesForUnknownEstimatesProject = (
  listItem: HTMLElement,
  buttonsGroup: HTMLElement,
  unknownEstimatesElement: HTMLSpanElement
): void => {
  unknownEstimatesElement.id = UNKNOWN_ESTIMATES;
  unknownEstimatesElement.innerHTML = unknownEstimatesMessage;

  buttonsGroup.style.background = "none";
  addClasses(listItem, "unknown-estimates-task-element");
  addClasses(unknownEstimatesElement, "unknown-estimates-text");
};

export const createUnknownEstimatesProject = (
  taskElement: HTMLElement
): HTMLSpanElement | undefined => {
  const unknownEstimates = document.createElement("span");

  const buttonsGroup = taskElement.querySelector(buttonsGroupClass);

  if (!(buttonsGroup instanceof HTMLElement)) {
    return undefined;
  }

  setStylesForUnknownEstimatesProject(
    taskElement,
    buttonsGroup,
    unknownEstimates
  );

  return unknownEstimates;
};
