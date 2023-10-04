interface createNoPointsArgs {
  readonly taskItem: HTMLElement;
  readonly taskTime: Element;
  readonly taskName: string;
}

interface SetStylesForNoPointsArgs extends createNoPointsArgs {
  readonly noPoints: HTMLSpanElement;
}

const NO_POINTS = "NO_POINTS";
const limitOfCharactersPerTask = 86;

const setStylesForNoPoints = ({
  taskItem,
  taskTime,
  taskName,
  noPoints,
}: SetStylesForNoPointsArgs): void => {
  taskItem.style.backgroundColor = "rgba(246, 193, 4, 0.11)";

  noPoints.innerHTML = "No points entered for this task";

  taskTime.id = NO_POINTS;

  if (taskName.length >= limitOfCharactersPerTask) {
    noPoints.style.left = "64px";
  }

  noPoints.style.fontSize = "11px";
  noPoints.style.fontWeight = "500";
  noPoints.style.fontFamily = "inherit";
  noPoints.style.color = "#BC760D";
  noPoints.style.position = "relative";
  noPoints.style.top = "0px";
  noPoints.style.left = "0px";
};

export const findNoPointsElement = (taskItem: HTMLElement): Element | null => {
  return taskItem.querySelector(`#${NO_POINTS}`);
};

export const createNoPoints = ({
  taskItem,
  taskTime,
  taskName,
}: createNoPointsArgs): HTMLSpanElement => {
  const noPoints = document.createElement("span");

  const stylesForNoPointsOptions = {
    taskItem,
    taskTime,
    taskName,
    noPoints,
  };
  setStylesForNoPoints(stylesForNoPointsOptions);

  return noPoints;
};
