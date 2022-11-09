import activityBlock from "./activity-block";
import projectBlock from "./project-block";
const runApp = () => {
  activityBlock();
  projectBlock();
};

window.setInterval(function () {
  runApp();
}, 1000);
