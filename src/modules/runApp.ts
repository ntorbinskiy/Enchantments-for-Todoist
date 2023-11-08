import {
  healthReportActivity,
  healthReportProject,
} from "../components/healthReports";
import activityModule from "./activityModule";
import projectModule from "./projectModule";

let isFirstSiteEnterProject = false;
let isFirstSiteEnterActivity = false;

const runApp = (): void => {
  const windowLink = window.location.href;
  const todoistLink = "https://todoist.com/app";

  if (
    windowLink.includes(`${todoistLink}/project`) ||
    windowLink === `${todoistLink}/today`
  ) {
    projectModule();
    if (!isFirstSiteEnterProject) {
      healthReportProject();
      isFirstSiteEnterProject = true;
    }
  } else if (windowLink.includes(`${todoistLink}/activity`)) {
    activityModule();
    if (!isFirstSiteEnterActivity) {
      healthReportActivity();
      isFirstSiteEnterActivity = true;
    }
  }
};

export default runApp;
