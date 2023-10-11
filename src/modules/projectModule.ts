import nodeToArray from "../helpers/nodeToArray";
import createOpenTaskButton from "../components/openTaskButton";
import {
  createTotalPoints,
  findTotalPointsElement,
  updateTotalPointsScore,
} from "../components/totalPoints";
import { Task } from "../core/types";
import { getTasksScoreNumber, tryGetItemScore } from "../core/taskUtils";
import { isDefined } from "../helpers/isDefined";

interface SetPageStylesArgs {
  readonly buttonsGroup: HTMLElement;
  readonly headerOfProject: HTMLElement;
  readonly projectName: HTMLElement;
}

const mapElementToTask = (taskElement: Element): Task | undefined => {
  const name = taskElement.innerHTML || "error";
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

const linkLogic = (): void => {
  const listOfItems = document.querySelectorAll(
    "li[class='task_list_item task_list_item--project_hidden']"
  );

  nodeToArray(listOfItems).map((task) => {
    if (!(task instanceof HTMLElement)) {
      return;
    }

    const buttonLinkParent = task.querySelector(
      ".task_list_item__actions--active"
    );

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
const updateTasksLabel = (
  tasks: readonly Task[],
  buttonsGroup: HTMLElement
): void => {
  const totalPointsScore = getTasksScoreNumber(tasks, true);

  const totalPointsElement = findTotalPointsElement();

  if (!totalPointsElement) {
    const totalPoints = createTotalPoints(totalPointsScore);
    buttonsGroup.after(totalPoints);
    return;
  }

  updateTotalPointsScore(totalPointsElement, totalPointsScore);
};

const totalPointsLogic = (): void => {
  const tasks = mapElementsToTasks(
    document.querySelectorAll("div.task_content")
  );

  const headerOfProject = document.querySelector("div.view_header__content")
    ?.childNodes[0]?.childNodes[0]; // I can't get this element other way, because there is dynamic class

  if (!(headerOfProject instanceof HTMLElement)) {
    return;
  }

  const buttonsGroup = headerOfProject.querySelector(
    "div.view_header__actions"
  );

  const projectName = headerOfProject.querySelector("h1")?.parentElement;

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
};

const projectModule = (): void => {
  linkLogic();
  totalPointsLogic();
};

export default projectModule;
