import activityModule from "./activityModule";
import projectModule from "./projectModule";

const runApp = (): void => {
  const windowLink = window.location.href;
  const todoistLink = "https://todoist.com/app";

  if (
    windowLink.includes(`${todoistLink}/project`) ||
    windowLink === `${todoistLink}/today`
  ) {
    projectModule();
  } else if (windowLink.includes(`${todoistLink}/activity`)) {
    activityModule();
  }
};

export default runApp;
