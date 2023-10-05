import { createNoPoints, findNoPointsElement } from "../components/noPoints";
import {
  createScoreBlock,
  findScoreBlockElement,
  updateScore,
} from "../components/scoreBlock";
import { findUnknownEstimatesElement } from "../components/unknownEstimates/unknownEstimates";
import { createUnknownEstimatesActivity } from "../components/unknownEstimates/unknownEstimatesActivity";
import nodeToArray from "../helpers/nodeToArray";

const isTaskCompleted = (svgPath: string): boolean => {
  const completedImagePath = "sm1/notification_completed.svg";

  return svgPath === completedImagePath;
};

const isTaskAssigned = (svgPath: string): boolean => {
  const assignedImagePath = "sm1/notification_assigned.svg";

  return svgPath === assignedImagePath;
};
const getItemScore = (
  name: string,
  regex: RegExp
): number | undefined | null => {
  if (name.replaceAll("\n", " ").match(/\[\.\.\.\]|\[\*\]$/)) {
    return null;
  }

  const scoreText =
    name.replaceAll("\n", " ").match(regex)?.groups?.["score"] ?? "";

  return parseInt(scoreText) || undefined;
};

const getTasksScores = (
  childNodes: NodeListOf<ChildNode>,
  regexForScoreAndPoints: RegExp
): number | undefined => {
  const taskChildNodes = nodeToArray(childNodes);
  if (taskChildNodes instanceof Element) {
    return;
  }

  return taskChildNodes
    .map((taskChildNode) => {
      if (!(taskChildNode instanceof HTMLElement)) {
        return;
      }

      const svgPathOfItemChildNode =
        taskChildNode.querySelector("svg")?.dataset.svgsPath ?? "";

      if (isTaskCompleted(svgPathOfItemChildNode)) {
        const itemScore = getItemScore(
          taskChildNode.innerText,
          regexForScoreAndPoints
        );

        return itemScore ?? 0;
      }

      return 0;
    })
    .reduce((accumulator, currentValue) => accumulator! + currentValue!, 0);
};

const mapTasks = (
  tasks: Element[] | ChildNode[],
  regexForScoreAndPoints: RegExp
): (number | undefined)[] => {
  return tasks.map((task) =>
    getTasksScores(task.childNodes, regexForScoreAndPoints)
  );
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

const isTaskCorrect = (regexForScoreAndPoints: RegExp) => {
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

    const score = getItemScore(taskName, regexForScoreAndPoints);

    const alertOptions = {
      taskItem,
      taskTime,
      taskName,
    };

    if (isTaskAssigned(svgPath)) {
      const unknownEstimatesElement = findUnknownEstimatesElement(taskItem);
      if (!unknownEstimatesElement && score === null) {
        const unknownEstimates = createUnknownEstimatesActivity(alertOptions);

        taskText.after(unknownEstimates);
      }
    }

    if (!isTaskCompleted(svgPath)) {
      return;
    }

    const noPointsElement = findNoPointsElement(taskItem);

    if (!noPointsElement && score === undefined) {
      const noPoints = createNoPoints(alertOptions);

      taskText.after(noPoints);
    }
  });
};

const activityModule = (): void => {
  const sectionsOfTasks = document.getElementsByClassName("section");
  const tasks = nodeToArray(document.querySelectorAll("ul.items"));

  const regexForScoreAndPoints = /^.*\[(?<score>\d+)\]\s*.*$/;

  mapTasks(tasks, regexForScoreAndPoints).map((points, index) => {
    if (!points && points !== 0) {
      return;
    }

    postCounterToPage(points, index, sectionsOfTasks);
  });

  isTaskCorrect(regexForScoreAndPoints);
};

export default activityModule;
