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
  readonly projectName: HTMLHeadingElement;
  readonly editProjectNameMode: Element | null;
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

const setHeaderOfProjectStyles = (headerOfProject: HTMLElement): void => {
  headerOfProject.style.display = "grid";
  headerOfProject.style.gridTemplateRows = "0fr 2fr";
  headerOfProject.style.gridTemplateColumns = "auto auto";
  headerOfProject.style.alignItems = "center";
  headerOfProject.style.gap = "21px";
};

const setButtonGroupStyles = (buttonsGroup: HTMLElement): void => {
  buttonsGroup.style.gridColumnStart = "2";
};

const setPageStyles = ({
  buttonsGroup,
  headerOfProject,
  projectName,
  editProjectNameMode,
}: SetPageStylesArgs): void => {
  setHeaderOfProjectStyles(headerOfProject);

  setButtonGroupStyles(buttonsGroup);

  if (editProjectNameMode instanceof HTMLElement) {
    editProjectNameMode.style.gridRow = "span 2";
  } else if (projectName) {
    projectName.style.gridRowStart = "2";
  }

  if (
    projectName &&
    projectName.parentElement &&
    projectName.parentElement !== headerOfProject
  ) {
    projectName.parentElement.style.gridRowStart = "2";
    headerOfProject.style.alignItems = "center";
  }
};

const totalPointsLogic = (): void => {
  const namesOfTasks = document.querySelectorAll("div.task_content");
  const headerOfProject = document.querySelector("div.view_header__content");

  if (!(headerOfProject instanceof HTMLElement)) {
    return;
  }

  const buttonsGroup = headerOfProject.querySelector(
    "div.view_header__actions"
  );
  const editProjectNameMode = document.querySelector(
    "[data-testid=view_header__form]"
  );
  const projectName = document.querySelector("h1");

  if (
    !(buttonsGroup instanceof HTMLElement) ||
    !(projectName instanceof HTMLElement)
  ) {
    return;
  }

  const totalPointsOptions = {
    buttonsGroup,
    headerOfProject,
    projectName,
    editProjectNameMode,
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
