import activityModule from "./activityModule";
import projectModule from "./projectModule";

const runApp = (): void => {
  console.log("da");
  const windowLink = window.location.href;
  const todoistLink = "https://todoist.com/app";
  const todoistAppLink = "https://app.todoist.com/app";

  if (
    windowLink.includes(`${todoistLink}/project`) ||
    windowLink === `${todoistLink}/today` ||
    windowLink.includes(`${todoistAppLink}/project`) ||
    windowLink === `${todoistAppLink}/today`
  ) {
    projectModule();
  } else if (
    windowLink.includes(`${todoistLink}/activity`) ||
    windowLink.includes(`${todoistAppLink}/activity`)
  ) {
    activityModule();
  }
};

export default runApp;
