import { ItemScore, ItemScoreTypes, Task } from "./types";

const regexForScoreAndPoints = /^.*\[(?<score>\d+)\]\s*.*$/;
const regexForUnknownPoints = /\[\.\.\.\]|\[\*\]$/;

const assertInvalidValue = (value: never): never => {
  throw new Error("Invalid value", value);
};

export const tryGetItemScore = (taskName: string): ItemScore => {
  const singleLineTaskName = taskName.replaceAll("\n", " ");

  if (singleLineTaskName.match(regexForUnknownPoints)) {
    return { type: ItemScoreTypes.Unassigned };
  }

  const score = parseInt(
    singleLineTaskName.match(regexForScoreAndPoints)?.groups?.["score"] ?? ""
  );

  return score
    ? { type: ItemScoreTypes.Assigned, score }
    : { type: ItemScoreTypes.Undefined };
};

const itemScoreToNumber = (itemScore: ItemScore): number => {
  switch (itemScore.type) {
    case ItemScoreTypes.Assigned:
      return itemScore.score;

    case ItemScoreTypes.Undefined:
    case ItemScoreTypes.Unassigned:
      return 0;

    default:
      return assertInvalidValue(itemScore);
  }
};

export const getItemScoreNumberByName = (taskName: string): number =>
  itemScoreToNumber(tryGetItemScore(taskName));

export const getTasksScoreNumber = (tasks: readonly Task[]): number => {
  return tasks.reduce(
    (accumulator, { score }) => accumulator + itemScoreToNumber(score),
    0
  );
};
