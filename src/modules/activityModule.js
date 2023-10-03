import { createNoPoints, findNoPointsElement } from "../components/noPoints";
import {
  createScoreBlock,
  findScoreBlockElement,
  updateScore,
} from "../components/scoreBlock";
import nodeToArray from "../helpers/nodeToArray";

const isTaskCompleted = (svgPath) => {
  const completedImagePath = "sm1/notification_completed.svg";

  return svgPath === completedImagePath;
};

const getItemScore = (name, regex) => {
  const scoreText = name.replaceAll("\n", " ").match(regex)?.groups?.["score"];
  return parseInt(scoreText) || undefined;
};

const getTasksScores = (childNodes, regexForScoreAndPoints) => {
  const taskChildNodes = nodeToArray(childNodes);

  return taskChildNodes
    .map((taskChildNode) => {
      const svgPathOfItemChildNode =
        taskChildNode.querySelector("svg").dataset.svgsPath;

      if (isTaskCompleted(svgPathOfItemChildNode)) {
        const itemScore = getItemScore(
          taskChildNode.innerText,
          regexForScoreAndPoints
        );

        return itemScore ?? 0;
      } else {
        return 0;
      }
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const mapTasks = (tasks, regexForScoreAndPoints) => {
  return tasks.map((task) => {
    return getTasksScores(task.childNodes, regexForScoreAndPoints);
  });
};

const postCounterToPage = (points, indexOfParent, parent) => {
  const scoreBlockParent = parent[indexOfParent].querySelector("h2");

  const scoreBlockElement = findScoreBlockElement(scoreBlockParent);

  if (!scoreBlockElement) {
    const scoreBlock = createScoreBlock(scoreBlockParent, points);
    scoreBlockParent.append(scoreBlock);

    return;
  }

  updateScore(scoreBlockParent, points);
};

const isTaskCorrect = (regexForScoreAndPoints) => {
  const taskIcons = document.getElementsByClassName("avatar_event_icon");

  nodeToArray(taskIcons).map((taskIcon) => {
    const taskItem = taskIcon.parentElement.parentElement;

    if (!isTaskCompleted(taskIcon.querySelector("svg").dataset.svgsPath)) {
      return;
    }

    const taskTime = taskItem.querySelector("span.activity_time");
    const taskName = taskItem.querySelector(".task_content").textContent;
    const taskText = taskItem.querySelector(".text");

    const score = getItemScore(taskName, regexForScoreAndPoints);

    const noPointsElement = findNoPointsElement(taskItem);

    if (!noPointsElement && score === undefined) {
      const noPointsOptions = {
        taskItem,
        taskTime,
        taskName,
      };

      const noPoints = createNoPoints(noPointsOptions);

      taskText.after(noPoints);
    }
  });
};

const activityModule = () => {
  const sectionsOfTasks = document.getElementsByClassName("section");
  const tasks = document.querySelectorAll("ul.items");

  const regexForScoreAndPoints = /^.*\[(?<score>\d+)\]\s*.*$/;

  mapTasks(nodeToArray(tasks), regexForScoreAndPoints).map((points, index) => {
    return postCounterToPage(points, index, sectionsOfTasks);
  });

  isTaskCorrect(regexForScoreAndPoints);
};

export default activityModule;
