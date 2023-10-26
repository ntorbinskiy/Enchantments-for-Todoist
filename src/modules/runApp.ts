import activityModule from "./activityModule";
import projectModule from "./projectModule";

const runApp = (): void => {
  const windowLink = window.location.href;
  const todoistLink = "https://app.todoist.com/app";

  if (
    windowLink.includes(`${todoistLink}/project`) ||
    windowLink === `${todoistLink}/today`
  ) {
    console.log("project module");
    projectModule();
  } else if (windowLink.includes(`${todoistLink}/activity`)) {
    activityModule();
  }
};

export default runApp;
