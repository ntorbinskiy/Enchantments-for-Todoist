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
    hasUnknownEstimatesLabel: findUnknownEstimatesElement(taskElement) !== null,
  };
};

const mapNodesToTasks = (
  childNodes: NodeListOf<ChildNode>
): readonly Task[] => {
  return nodeToArray(childNodes).map(mapElementToTask).filter(isDefined);
};

const getTasksScores = (childNodes: NodeListOf<ChildNode>): number => {
  return getTasksScoreNumber(mapNodesToTasks(childNodes));
};

const mapTasks = (tasks: Element[] | ChildNode[]): number[] => {
  return tasks.map((task) => getTasksScores(task.childNodes));
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

  if (task.isAssigned) {
    const unknownEstimatesElement = findUnknownEstimatesElement(taskElement); // ! ADD className
    if (
      !unknownEstimatesElement &&
      task.score.type === ItemScoreTypes.Unassigned
    ) {
      const unknownEstimates = createUnknownEstimatesActivity(
        taskElement,
        task.name
      );

      const taskText = taskElement.querySelector(".text");

      taskText?.after(unknownEstimates);
    }
  }

  //   const taskIcons = nodeToArray(
  //     document.getElementsByClassName("avatar_event_icon")
  //   );
  //   if (taskIcons instanceof Element) {
  //     return;
  //   }
  //   taskIcons.map((taskIcon) => {
  //     if (
  //       !taskIcon.parentElement ||
  //       !(taskIcon instanceof HTMLElement) ||
  //       !taskIcon.parentElement.parentElement
  //     ) {
  //       return;
  //     }
  //     const taskItem = taskIcon.parentElement.parentElement;
  //     const taskNameItem = taskItem.querySelector(".task_content");
  //     const taskTime = taskItem.querySelector("span.activity_time");
  //     const taskText = taskItem.querySelector(".text");
  //     const svgIcon = taskIcon.querySelector("svg");
  //     if (!svgIcon || !taskNameItem || !taskTime || !taskText) {
  //       return;
  //     }
  //     const svgPath = svgIcon.dataset.svgsPath ?? "";
  //     const taskName = taskNameItem.textContent ?? "";
  //     const score = tryGetItemScore(taskName);
  //     const alertOptions = {
  //       taskItem,
  //       taskTime,
  //       taskName,
  //     };
  //     if (isTaskAssigned(svgPath)) {
  //       const unknownEstimatesElement = findUnknownEstimatesElement(taskItem);
  //       if (
  //         !unknownEstimatesElement &&
  //         score.type === ItemScoreTypes.Unassigned
  //       ) {
  //         const unknownEstimates = createUnknownEstimatesActivity(alertOptions);
  //         taskText.after(unknownEstimates);
  //       }
  //     }
  //     if (!isTaskCompleted(svgPath)) {
  //       return;
  //     }
  //     const noPointsElement = findNoPointsElement(taskItem);
  //     if (!noPointsElement && score.type === ItemScoreTypes.Undefined) {
  //       const noPoints = createNoPoints(alertOptions);
  //       taskText.after(noPoints);
  //     }
  //   });
};

const activityModule = (): void => {
  const sectionsOfTasks = document.getElementsByClassName("section");

  Array.from(sectionsOfTasks).forEach((section) => {
    const tasksNodes = section.querySelectorAll("li.event");

    const sectionScoreNumber = getTasksScoreNumber(mapNodesToTasks(tasksNodes));

    postCounterToPage(sectionScoreNumber, section);
    updateTaskLabel();
  });
};

export default activityModule;
