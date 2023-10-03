import nodeToArray from "../helpers/nodeToArray";
import createOpenTaskButton from "../components/openTaskButton";
import {
  createTotalPoints,
  findTotalPointsElement,
  updateTotalPointsScore,
} from "../components/totalPoints";

const linkLogic = () => {
  const listOfItems = document.querySelectorAll(
    "li[class='task_list_item task_list_item--project_hidden']"
  );

  nodeToArray(listOfItems).map((task) => {
    const buttonLinkParent = task.querySelector(
      ".task_list_item__actions--active"
    );

    if (!buttonLinkParent) {
      return;
    }

    task.addEventListener("mouseenter", () => {
      if (!buttonLinkParent.querySelector("button.button-href")) {
        const openTaskButton = createOpenTaskButton(task.dataset.itemId);

        buttonLinkParent.prepend(openTaskButton);
      }
    });
  });
};

const getTotalPoints = (namesOfTasks) => {
  const regexForTotalPoints = /^.*\[(?<score>\d+)\]\s*.*$/;
  const modalDialog = document.querySelector("div[role=dialog]");

  return nodeToArray(namesOfTasks)
    .filter((task) => {
      return modalDialog === null || !modalDialog.contains(task);
    })
    .map((nameOfTaskItem) => {
      const scoreText = nameOfTaskItem.textContent
        .replaceAll("\n", " ")
        .match(regexForTotalPoints)?.groups?.["score"];

      return parseInt(scoreText) || 0;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const setHeaderOfProjectStyles = (headerOfProject) => {
  headerOfProject.style.display = "grid";
  headerOfProject.style.gridTemplateRows = "0fr 2fr";
  headerOfProject.style.gridTemplateColumns = "auto auto";
  headerOfProject.style.alignItems = "center";
  headerOfProject.style.gap = "21px";
};

const setButtonGroupStyles = (buttonsGroup) => {
  buttonsGroup.style.gridColumnStart = 2;
};

const setPageStyles = ({
  buttonsGroup,
  headerOfProject,
  projectName,
  editProjectNameMode,
}) => {
  setHeaderOfProjectStyles(headerOfProject);

  setButtonGroupStyles(buttonsGroup);

  if (editProjectNameMode) {
    editProjectNameMode.style.gridRow = "span 2";
  } else if (projectName) {
    projectName.style.gridRowStart = 2;
  }

  if (
    projectName &&
    projectName.parentElement &&
    projectName.parentElement !== headerOfProject
  ) {
    projectName.parentElement.style.gridRowStart = 2;
    headerOfProject.style.alignItems = "center";
  }
};

const totalPointsLogic = () => {
  const namesOfTasks = document.querySelectorAll("div.task_content");
  const headerOfProject = document.querySelector("div.view_header__content");
  const buttonsGroup = headerOfProject.querySelector(
    "div.view_header__actions"
  );
  const editProjectNameMode = document.querySelector(
    "[data-testid=view_header__form]"
  );
  const projectName = document.querySelector("h1");

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

const projectModule = () => {
  linkLogic();
  totalPointsLogic();
};

export default projectModule;
