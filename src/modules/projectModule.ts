import nodeToArray from "../helpers/nodeToArray";
import createOpenTaskButton from "../components/openTaskButton";
import {
  createTotalPoints,
  findTotalPointsElement,
  updateTotalPointsScore,
} from "../components/totalPoints";

interface SetPageStylesArgs {
  readonly buttonsGroup: HTMLElement;
  readonly headerOfProject: HTMLElement;
  readonly projectName: HTMLElement;
}

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

const getTotalPoints = (namesOfTasks: NodeListOf<Element>): number => {
  const regexForTotalPoints = /^.*\[(?<score>\d+)\]\s*.*$/;
  const modalDialog = document.querySelector("div[role=dialog]");

  return nodeToArray(namesOfTasks)
    .filter((task) => {
      return modalDialog === null || !modalDialog.contains(task);
    })
    .map((nameOfTaskItem) => {
      const taskTextContent = nameOfTaskItem.textContent ?? "";
      const scoreText =
        taskTextContent.replaceAll("\n", " ").match(regexForTotalPoints)
          ?.groups?.["score"] ?? "";

      return parseInt(scoreText) || 0;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
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

const totalPointsLogic = (): void => {
  const namesOfTasks = document.querySelectorAll("div.task_content");
  const headerOfProject = document.querySelector("div.view_header__content")
    ?.childNodes[0]?.childNodes[0]; // I can't get this element other way, because there is dynamic class

  if (!(headerOfProject instanceof HTMLElement)) {
    return;
  }

  const buttonsGroup = headerOfProject.querySelector(
    "div.view_header__actions"
  );

  const projectName =
    headerOfProject.querySelector("h1[role='heading']")?.parentElement;

  if (
    !(buttonsGroup instanceof HTMLElement) ||
    !(projectName instanceof HTMLElement)
  ) {
    return;
  }

  const totalPointsOptions: SetPageStylesArgs = {
    buttonsGroup,
    headerOfProject,
    projectName,
  };

  setPageStyles(totalPointsOptions);

  const totalPointsScore = getTotalPoints(namesOfTasks);

  const totalPointsElement = findTotalPointsElement();

  if (!totalPointsElement) {
    const totalPoints = createTotalPoints(totalPointsScore);
    buttonsGroup.after(totalPoints);
    return;
  }

  updateTotalPointsScore(totalPointsElement, totalPointsScore);
};

const projectModule = (): void => {
  linkLogic();
  totalPointsLogic();
};

export default projectModule;
