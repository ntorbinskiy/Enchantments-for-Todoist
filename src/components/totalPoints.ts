import { addClasses } from "../helpers/addClasses";

const TOTAL_POINTS_ID = "TOTAL_POINTS_ID";
const TOTAL_POINTS_SCORE_ID = "TOTAL_POINTS_SCORE_ID";

export const findTotalPointsElement = (): Element | null => {
  return document.querySelector(`#${TOTAL_POINTS_ID}`);
};

export const updateTotalPointsScore = (
  totalPointsElement: Element,
  totalPoints: number
): void => {
  const totalPointsSpan2 = totalPointsElement.querySelector(
    `#${TOTAL_POINTS_SCORE_ID}`
  );

  if (!totalPointsSpan2) {
    return;
  }

  totalPointsSpan2.textContent = `${totalPoints}`;
};

const setTotalPointsParentStyles = (
  totalPointsParent: HTMLDivElement
): void => {
  totalPointsParent.classList.add("total-points-element");
  totalPointsParent.id = TOTAL_POINTS_ID;
};

const setTotalPointsElementStyles = (
  totalPointsElement: HTMLDivElement
): void => {
  totalPointsElement.textContent = "Total points left for this project: ";

  addClasses(totalPointsElement, "font-size-12");
};

const setTotalPointsSpanStyles = (
  totalPointsSpan: HTMLSpanElement,
  totalPoints: number
): void => {
  totalPointsSpan.textContent = `${totalPoints}`;
  addClasses(totalPointsSpan, "score-sum");
  totalPointsSpan.id = TOTAL_POINTS_SCORE_ID;
};

export const createTotalPoints = (totalPoints: number): HTMLDivElement => {
  const totalPointsParent = document.createElement("div");
  const totalPointsElement = document.createElement("div");
  const totalPointsSpan = document.createElement("span");

  setTotalPointsParentStyles(totalPointsParent);

  setTotalPointsElementStyles(totalPointsElement);

  setTotalPointsSpanStyles(totalPointsSpan, totalPoints);

  totalPointsElement.append(totalPointsSpan);
  totalPointsParent.append(totalPointsElement);

  return totalPointsParent;
};
