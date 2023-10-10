interface setStylesForScoresArgs {
  scoreSum: HTMLSpanElement;
  scoreText: HTMLSpanElement;
  scoreBlockParent: Element;
  points: number;
}

const SCORE_SUM = "SCORE_SUM";

const setScoreSumStyles = (
  scoreSum: HTMLSpanElement,
  pointsCount: number
): void => {
  scoreSum.innerHTML = `${pointsCount}`;
  scoreSum.style.fontSize = "12px";
  scoreSum.style.fontWeight = "700";
  scoreSum.style.fontFamily = "inherit";
  scoreSum.style.position = "relative";
  scoreSum.id = SCORE_SUM;
};

const setScoreTextStyles = (scoreText: HTMLSpanElement): void => {
  scoreText.innerHTML = "Total Score For This Day: ";
  scoreText.style.fontSize = "12px";
  scoreText.style.fontWeight = "400";
  scoreText.style.fontFamily = "inherit";
  scoreText.style.position = "relative";
};

const setScoreBlockParentStyles = (scoreBlockParent: Element): void => {
  if (!(scoreBlockParent instanceof HTMLElement)) {
    return;
  }

  scoreBlockParent.style.display = "flex";
  scoreBlockParent.style.justifyContent = "space-between";
};

const setStylesForScores = ({
  scoreSum,
  scoreText,
  scoreBlockParent,
  points,
}: setStylesForScoresArgs): void => {
  setScoreSumStyles(scoreSum, points);
  setScoreTextStyles(scoreText);
  setScoreBlockParentStyles(scoreBlockParent);
};

export const findScoreBlockElement = (
  scoreBlockParent: Element
): Element | null => {
  return scoreBlockParent.querySelector(`#${SCORE_SUM}`);
};

export const updateScore = (scoreBlockParent: Element, points: number) => {
  const scoreTextOnPage = scoreBlockParent.querySelector(`#${SCORE_SUM}`);

  if (!(scoreTextOnPage instanceof HTMLElement)) {
    return;
  }

  scoreTextOnPage.textContent = `${points}`;
};

export const createScoreBlock = (
  scoreBlockParent: Element,
  points: number
): HTMLDivElement => {
  const scoreBlock = document.createElement("div");
  const scoreText = document.createElement("span");
  const scoreSum = document.createElement("span");

  scoreBlock.append(scoreText, scoreSum);

  const stylesForScoresOptions = {
    scoreSum,
    scoreText,
    scoreBlockParent,
    points,
  };

  setStylesForScores(stylesForScoresOptions);

  return scoreBlock;
};
