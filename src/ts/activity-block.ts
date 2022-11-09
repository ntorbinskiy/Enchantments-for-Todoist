const isCompleteTask = (taskElement: HTMLElement): boolean =>
  taskElement.dataset.svgsPath === "sm1/notification_completed.svg";

const isIconCompleted = (element: HTMLElement) =>
  element.dataset.svgsPath !== "sm1/notification_completed.svg";

const connectFonts = () => {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
  );
  document.head.appendChild(link);
};

const getTaskScore = (name: string, regex: RegExp): number | undefined => {
  const scoreText = name.replaceAll("\n", " ").match(regex)?.groups?.["score"];
  return scoreText ? parseInt(scoreText) : undefined;
};

const getTasksScores = (
  tasks: Element[],
  getItemScore: (name: string, regex: RegExp) => number | undefined,
  regexForScoreAndPoints: RegExp
) => {
  return tasks.map((item) => {
    return Array.from(item.childNodes)
      .map((task) => {
        const svgPath = task.childNodes[0]?.childNodes[1]?.childNodes[0];
        if (
          svgPath instanceof HTMLElement &&
          isCompleteTask(svgPath) &&
          task instanceof HTMLElement
        ) {
          const itemScore = getItemScore(
            task.innerText,
            regexForScoreAndPoints
          );
          return itemScore ?? 0;
        } else {
          return 0;
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  });
};

const setStylesForScores = (
  sumOfScores: HTMLSpanElement,
  textForScore: HTMLSpanElement,
  counterNum: HTMLElement,
  points: number
) => {
  sumOfScores.innerHTML = `${points}`;
  sumOfScores.style.fontSize = "12px";
  sumOfScores.style.fontWeight = "700";
  sumOfScores.style.fontFamily = "Inter";
  sumOfScores.style.position = "relative";

  textForScore.innerHTML = `Total Score For This Day: `;
  textForScore.style.fontSize = "12px";
  textForScore.style.fontWeight = "400";
  textForScore.style.fontFamily = "Inter";
  textForScore.style.position = "relative";

  counterNum.style.display = "flex";
  counterNum.style.justifyContent = "space-between";
};

const pastDivToPage = (
  points: number,
  numForId: number,
  parent: HTMLCollectionOf<Element>
) => {
  const scoreBlock = document.createElement("div");
  const textForScore = document.createElement("span");
  const sumOfScores = document.createElement("span");

  const counterNumber = parent[numForId]?.childNodes[0]?.childNodes[1];
  if (!(counterNumber instanceof HTMLElement)) {
    return;
  }

  scoreBlock.append(textForScore, sumOfScores);

  setStylesForScores(sumOfScores, textForScore, counterNumber, points);
  if (
    counterNumber.id === "counter" &&
    counterNumber.childNodes[1]?.childNodes[1]?.textContent &&
    counterNumber?.childNodes[1]?.childNodes[1]?.textContent !== `${points}`
  ) {
    counterNumber.childNodes[1].childNodes[1].textContent = `${points}`;
  } else if (counterNumber.id === "counter") {
    return;
  } else {
    counterNumber.append(scoreBlock);
    counterNumber.id = `counter`;
  }
};

const checkIsTaskCorrect = (regexForScoreAndPoints: RegExp) => {
  const icons = document.getElementsByClassName("avatar_event_icon");

  Array.from(icons).map((element) => {
    const elementParent = element.parentElement?.parentElement;
    const pathForSvgIconCheck = element.children[0];

    if (!(elementParent instanceof HTMLElement)) {
      return;
    }
    const listItem = elementParent.childNodes;
    const span = elementParent.childNodes[1]?.childNodes[1];

    const taskName =
      elementParent.childNodes[1]?.childNodes[0]?.childNodes[2]?.childNodes[0]
        ?.childNodes[0]?.textContent ?? " ";

    const score = getTaskScore(taskName, regexForScoreAndPoints);

    if (
      pathForSvgIconCheck instanceof HTMLElement &&
      isIconCompleted(pathForSvgIconCheck)
    ) {
      return;
    }

    //time of task

    if (score === undefined) {
      elementParent.style.backgroundColor = "rgba(246, 193, 4, 0.11)";
      if (!(span instanceof HTMLElement) || span.id === "noPoints") {
        return;
      }
      const noPoints = document.createElement("span");
      noPoints.innerHTML = "No points entered for this task";
      span.id = "noPoints";
      noPoints.style.fontSize = "11px";
      noPoints.style.fontWeight = "500";
      noPoints.style.fontFamily = "Inter";
      noPoints.style.color = "#BC760D";
      noPoints.style.position = "relative";
      noPoints.style.top = "0px";
      noPoints.style.left = "0px";
      if (taskName.length >= 86) {
        noPoints.style.left = "64px";
      }
      listItem[1]?.after(noPoints);
    }
  });
};

const activityBlock = () => {
  if (!window.location.href.includes("https://todoist.com/app/activity")) {
    return;
  }
  connectFonts();

  const sectionOfTasks = document.getElementsByClassName("section");
  const items = document.querySelectorAll("ul.items");
  const itemsArray = Array.from(items);
  const regexForScoreAndPoints = /^.*\[(?<score>\d+)\]\s*.*$/;

  getTasksScores(itemsArray, getTaskScore, regexForScoreAndPoints).map(
    (item, index) => {
      return pastDivToPage(item, index, sectionOfTasks);
    }
  );

  checkIsTaskCorrect(regexForScoreAndPoints);
};

export default activityBlock;
