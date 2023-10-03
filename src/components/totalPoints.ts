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
  totalPointsParent.style.minWidth = "190px";
  totalPointsParent.style.justifySelf = "end";
  totalPointsParent.style.gridColumnStart = "-2";
  totalPointsParent.style.gridRowStart = "2";
  totalPointsParent.id = TOTAL_POINTS_ID;
};

const setTotalPointsElementStyles = (
  totalPointsElement: HTMLDivElement
): void => {
  totalPointsElement.textContent = "Total points left for this project: ";
  totalPointsElement.style.fontFamily = "inherit";
  totalPointsElement.style.fontSize = "12px";
};

const setTotalPointsSpanStyles = (
  totalPointsSpan: HTMLSpanElement,
  totalPoints: number
) => {
  totalPointsSpan.textContent = `${totalPoints}`;
  totalPointsSpan.style.fontFamily = "inherit";
  totalPointsSpan.style.fontSize = "12px";
  totalPointsSpan.style.fontWeight = "700";
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
