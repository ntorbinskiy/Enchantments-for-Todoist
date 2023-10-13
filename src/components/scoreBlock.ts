import { addClasses } from "../helpers/addClasses";

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
  scoreSum.id = SCORE_SUM;

  addClasses(scoreSum, "score-sum", "font-size-12");
};

const setScoreTextStyles = (scoreText: HTMLSpanElement): void => {
  scoreText.innerHTML = "Total Score For This Day: ";

  addClasses(scoreText, "score-text", "font-size-12");
};

const setScoreBlockParentStyles = (scoreBlockParent: Element): void => {
  addClasses(scoreBlockParent, "score-parent");
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
