export const UNKNOWN_ESTIMATES = "UNKNOWN_ESTIMATES";

export const findUnknownEstimatesElement = (
  taskItem: Element
): Element | null => {
  return taskItem.querySelector(`#${UNKNOWN_ESTIMATES}`);
};
