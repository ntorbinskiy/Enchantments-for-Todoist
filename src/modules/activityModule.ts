import { createNoPoints, findNoPointsElement } from "../components/noPoints";
import {
  createScoreBlock,
  findScoreBlockElement,
  updateScore,
} from "../components/scoreBlock";
import { findUnknownEstimatesElement } from "../components/unknownEstimates/unknownEstimates";
import { createUnknownEstimatesActivity } from "../components/unknownEstimates/unknownEstimatesActivity";
import { getTasksScoreNumber, tryGetItemScore } from "../core/taskUtils";
import { ItemScoreTypes, Task } from "../core/types";
import { isDefined } from "../helpers/isDefined";
import nodeToArray from "../helpers/nodeToArray";

const assignedImagePath = "sm1/notification_assigned.svg";
const completedImagePath = "sm1/notification_completed.svg";

const mapElementToTask = (taskElement: ChildNode): Task | undefined => {
  if (!(taskElement instanceof HTMLElement)) {
    return undefined;
  }

  const name = taskElement.querySelector("div.task_content")?.textContent;

  if (!name) {
    return undefined;
  }

  const svgPath = taskElement.querySelector("svg")?.dataset.svgsPath ?? "";

  return {
    name,
    isAssigned: svgPath === assignedImagePath,
    isCompleted: svgPath === completedImagePath,
    score: tryGetItemScore(name),
    containsModalDialog: false,
  };
};

const mapNodesToTasks = (
  childNodes: NodeListOf<ChildNode>
): readonly Task[] => {
  return nodeToArray(childNodes)
    .map(mapElementToTask)
    .filter(isDefined)
    .filter((task) => task.isCompleted);
};

const postCounterToPage = (points: number, sectionElement: Element): void => {
  const scoreBlockParent = sectionElement.querySelector("h2");

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

const updateTaskLabel = (taskElement: HTMLElement, task: Task): void => {
  if (!task.isAssigned && !task.isCompleted) {
    return;
  }

  const taskText = taskElement.querySelector(".text");

  if (task.isAssigned) {
    const unknownEstimatesElement = findUnknownEstimatesElement(taskElement);
    if (
      !unknownEstimatesElement &&
      task.score.type === ItemScoreTypes.Unassigned
    ) {
      const unknownEstimates = createUnknownEstimatesActivity(
        taskElement,
        task.name
      );

      taskText?.after(unknownEstimates);
    }
  }

  if (task.isCompleted) {
    const noPointsElement = findNoPointsElement(taskElement);
    if (!noPointsElement && task.score.type === ItemScoreTypes.Undefined) {
      const noPoints = createNoPoints(taskElement, task.name);

      taskText?.after(noPoints);
    }
  }
};

const activityModule = (): void => {
  const sectionsOfTasks = document.getElementsByClassName("section");

  Array.from(sectionsOfTasks).forEach((section) => {
    const tasksNodes = section.querySelectorAll("li.event");

    const sectionScoreNumber = getTasksScoreNumber(mapNodesToTasks(tasksNodes));

    postCounterToPage(sectionScoreNumber, section);

    Array.from(tasksNodes).forEach((taskNode) => {
      const taskItem = mapElementToTask(taskNode);

      if (!taskItem || !(taskNode instanceof HTMLElement)) {
        return;
      }

      updateTaskLabel(taskNode, taskItem);
    });
  });
};

export default activityModule;
