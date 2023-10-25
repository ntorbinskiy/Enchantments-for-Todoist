import nodeToArray from "../helpers/nodeToArray";
import createOpenTaskButton from "../components/openTaskButton";
import {
  createTotalPoints,
  findTotalPointsElement,
  updateTotalPointsScore,
} from "../components/totalPoints";
import { ItemScoreTypes, Task } from "../core/types";
import { getTasksScoreNumber, tryGetItemScore } from "../core/taskUtils";
import { isDefined } from "../helpers/isDefined";
import { findUnknownEstimatesElement } from "../components/unknownEstimates/unknownEstimates";
import { createUnknownEstimatesProject } from "../components/unknownEstimates/unknownEstimatesProject";

interface SetPageStylesArgs {
  readonly buttonsGroup: HTMLElement;
  readonly headerOfProject: HTMLElement;
  readonly projectName: HTMLElement;
}

export const buttonsGroupClass = ".task_list_item__actions";
const headerOfProjectClass = "div.eae3d34f";
const taskItemButtonsClass = "div._4bb9987d";
const projectNameClass = "div._9dd31975";

const mapElementToTask = (taskElement: Element): Task | undefined => {
  if (!(taskElement instanceof HTMLElement)) {
    return undefined;
  }

  const name = taskElement.innerText || "error";
  const modalDialog = document.querySelector("div[role=dialog]");

  return {
    name,
    isAssigned: false,
    isCompleted: false,
    score: tryGetItemScore(name),
    containsModalDialog: !modalDialog
      ? false
      : modalDialog.contains(taskElement),
  };
};

const mapElementsToTasks = (tasks: NodeListOf<Element>): readonly Task[] => {
  return Array.from(tasks).map(mapElementToTask).filter(isDefined);
};

const linkLogic = (listOfItems: NodeListOf<Element>): void => {
  nodeToArray(listOfItems).map((task) => {
    if (!(task instanceof HTMLElement)) {
      return;
    }

    const buttonLinkParent = task.querySelector(buttonsGroupClass);

    if (!buttonLinkParent) {
      return;
    }

    task.addEventListener("mouseenter", () => {
      if (!buttonLinkParent.querySelector("button.button-href")) {
        const openTaskButton = createOpenTaskButton(
          task.dataset.itemId ?? "error"
        );

        buttonLinkParent.prepend(openTaskButton);
      }
    });
  });
};

const setPageStyles = ({
  buttonsGroup,
  headerOfProject,
  projectName,
}: SetPageStylesArgs): void => {
  headerOfProject.classList.add("header-root");

  buttonsGroup.classList.add("buttons-group");

  projectName.classList.add("project-name");
};

const updateUnknownEstimatesTask = (
  taskElement: HTMLElement,
  task: Task
): void => {
  const unknownEstimatesElement = findUnknownEstimatesElement(taskElement);

  const taskText = taskElement.querySelector(
    ".task_list_item__content__wrapper"
  );

  if (
    !unknownEstimatesElement &&
    task.score.type === ItemScoreTypes.Unassigned
  ) {
    const unknownEstimates = createUnknownEstimatesProject(taskElement);

    if (!unknownEstimates) {
      return;
    }

    taskText?.after(unknownEstimates);
  }
};

const updateTasksLabel = (
  tasks: readonly Task[],
  buttonsGroup: HTMLElement
): void => {
  const totalPointsScore = getTasksScoreNumber(tasks, true);

  const totalPointsElement = findTotalPointsElement();

  if (!totalPointsElement) {
    const totalPoints = createTotalPoints(totalPointsScore);
    if (!buttonsGroup.parentElement) {
      return;
    }

    buttonsGroup.after(totalPoints);
    return;
  }

  updateTotalPointsScore(totalPointsElement, totalPointsScore);
};

const updateUnknownEstimatesTasks = (taskNodes: NodeListOf<Element>): void => {
  Array.from(taskNodes).map((taskNode) => {
    const task = mapElementToTask(taskNode);

    if (!task || !(taskNode instanceof HTMLElement)) {
      return;
    }

    updateUnknownEstimatesTask(taskNode, task);
  });
};

const totalPointsLogic = (taskNodes: NodeListOf<Element>): void => {
  const tasks = mapElementsToTasks(
    document.querySelectorAll("div.task_content")
  );

  const headerOfProject = document.querySelector(headerOfProjectClass);

  if (!(headerOfProject instanceof HTMLElement)) {
    return;
  }

  const buttonsGroup = headerOfProject.querySelector(taskItemButtonsClass);

  const projectName = headerOfProject.querySelector(projectNameClass);

  if (
    !(buttonsGroup instanceof HTMLElement) ||
    !(projectName instanceof HTMLElement)
  ) {
    return;
  }

  const pageStyles: SetPageStylesArgs = {
    buttonsGroup,
    headerOfProject,
    projectName,
  };

  setPageStyles(pageStyles);

  updateTasksLabel(tasks, buttonsGroup);

  updateUnknownEstimatesTasks(taskNodes);
};

const projectModule = (): void => {
  const listOfItems = document.querySelectorAll(
    "li[class='task_list_item task_list_item--project_hidden']"
  );

  linkLogic(listOfItems);
  totalPointsLogic(listOfItems);
};

export default projectModule;
