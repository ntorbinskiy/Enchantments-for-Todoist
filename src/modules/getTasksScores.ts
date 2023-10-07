import { getTasksScoreNumber } from "../core/taskUtils";
import { mapNodesToTasks } from "./activityModule";

export const getTasksScores = (childNodes: NodeListOf<ChildNode>): number => {
  return getTasksScoreNumber(mapNodesToTasks(childNodes));
};
