import { createNoPoints, findNoPointsElement } from "../components/noPoints";
import {
  createScoreBlock,
  findScoreBlockElement,
  updateScore,
} from "../components/scoreBlock";
import { findUnknownEstimatesElement } from "../components/unknownEstimates/unknownEstimates";
import { createUnknownEstimatesActivity } from "../components/unknownEstimates/unknownEstimatesActivity";
import nodeToArray from "../helpers/nodeToArray";

const enum ItemScoreTypes {
  Assigned = "assigned",
  Unassigned = "unassigned",
  Undefined = "undefined",
}

type ItemScore =
  | {
      type: ItemScoreTypes.Assigned;
      score: number;
    }
  | {
      type: ItemScoreTypes.Unassigned;
    }
  | {
      type: ItemScoreTypes.Undefined;
    };

const regexForScoreAndPoints = /^.*\[(?<score>\d+)\]\s*.*$/;
const regexForUnknownPoints = /\[\.\.\.\]|\[\*\]$/;

const assertInvalidValue = (value: never): never => {
  throw new Error("Invalid value", value);
};

const isTaskCompleted = (svgPath: string): boolean => {
  const completedImagePath = "sm1/notification_completed.svg";

  return svgPath === completedImagePath;
};

const isTaskAssigned = (svgPath: string): boolean => {
  const assignedImagePath = "sm1/notification_assigned.svg";

  return svgPath === assignedImagePath;
};

const tryGetItemScore = (taskName: string): ItemScore => {
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

const getTasksScores = (
  childNodes: NodeListOf<ChildNode>
): number | undefined => {
  const taskChildNodes = nodeToArray(childNodes);
  if (taskChildNodes instanceof Element) {
    return;
  }

  return taskChildNodes
    .map((taskChildNode): number => {
      if (!(taskChildNode instanceof HTMLElement)) {
        console.warn("TaskChildNode is not instance of HTMLElement");

        return 0;
      }

      const svgPathOfItemChildNode =
        taskChildNode.querySelector("svg")?.dataset.svgsPath ?? "";

      if (isTaskCompleted(svgPathOfItemChildNode)) {
        const itemScore = tryGetItemScore(taskChildNode.innerText);

        switch (itemScore.type) {
          case ItemScoreTypes.Assigned:
            return itemScore.score;

          case ItemScoreTypes.Undefined:
          case ItemScoreTypes.Unassigned:
            return 0;

          default:
            return assertInvalidValue(itemScore);
        }
      }

      return 0;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const mapTasks = (tasks: Element[] | ChildNode[]): (number | undefined)[] => {
  return tasks.map((task) => getTasksScores(task.childNodes));
};

const postCounterToPage = (
  points: number,
  indexOfParent: number,
  parent: HTMLCollectionOf<Element>
): void => {
  const parentNode = parent[indexOfParent];

  if (!parentNode) {
    return;
  }

  const scoreBlockParent = parentNode.querySelector("h2");

  if (!scoreBlockParent) {
    return;
  }

  const scoreBlockElement = findScoreBlockElement(scoreBlockParent);

  if (!scoreBlockElement) {
    const scoreBlock = createScoreBlock(scoreBlockParent, points);
    scoreBlockParent.append(scoreBlock);

    return;
  }

  updateScore(scoreBlockParent, points);
};

const updateTaskLabel = (): void => {
  const taskIcons = nodeToArray(
    document.getElementsByClassName("avatar_event_icon")
  );

  if (taskIcons instanceof Element) {
    return;
  }

  taskIcons.map((taskIcon) => {
    if (
      !taskIcon.parentElement ||
      !(taskIcon instanceof HTMLElement) ||
      !taskIcon.parentElement.parentElement
    ) {
      return;
    }

    const taskItem = taskIcon.parentElement.parentElement;
    const taskNameItem = taskItem.querySelector(".task_content");
    const taskTime = taskItem.querySelector("span.activity_time");
    const taskText = taskItem.querySelector(".text");

    const svgIcon = taskIcon.querySelector("svg");

    if (!svgIcon || !taskNameItem || !taskTime || !taskText) {
      return;
    }

    const svgPath = svgIcon.dataset.svgsPath ?? "";
    const taskName = taskNameItem.textContent ?? "";

    const score = tryGetItemScore(taskName);

    const alertOptions = {
      taskItem,
      taskTime,
      taskName,
    };

    if (isTaskAssigned(svgPath)) {
      const unknownEstimatesElement = findUnknownEstimatesElement(taskItem);
      if (
        !unknownEstimatesElement &&
        score.type === ItemScoreTypes.Unassigned
      ) {
        const unknownEstimates = createUnknownEstimatesActivity(alertOptions);

        taskText.after(unknownEstimates);
      }
    }

    if (!isTaskCompleted(svgPath)) {
      return;
    }

    const noPointsElement = findNoPointsElement(taskItem);

    if (!noPointsElement && score.type === ItemScoreTypes.Undefined) {
      const noPoints = createNoPoints(alertOptions);

      taskText.after(noPoints);
    }
  });
};

const activityModule = (): void => {
  const sectionsOfTasks = document.getElementsByClassName("section");
  const tasks = nodeToArray(document.querySelectorAll("ul.items"));

  mapTasks(tasks).map((points, index) => {
    if (!points && points !== 0) {
      return;
    }

    postCounterToPage(points, index, sectionsOfTasks);
  });

  updateTaskLabel();
};

export default activityModule;
