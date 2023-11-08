import { findTotalPointsElement } from "./totalPoints";

type Negative = "doesn't work ❌";
type Positive = "all works perfect ✅";
type Status = Negative | Positive;
type Feature = "total points" | "unknown estimates" | "buttons group";

interface StatusCodes {
  negative: Negative;
  positive: Positive;
}

interface FeatureState {
  feature: Feature;
  result: boolean;
}

const statusCodes: StatusCodes = {
  negative: "doesn't work ❌",
  positive: "all works perfect ✅",
};

const validateStatusCodes = (result: boolean): Status => {
  return result ? statusCodes.positive : statusCodes.negative;
};

const initFeatureStates = (): readonly FeatureState[] => {
  return [
    {
      feature: "total points",
      result: Boolean(findTotalPointsElement()),
    },
    { feature: "buttons group", result: true },
  ];
};

const consoleLogResult = (featureName: string, statusCode: Status): void => {
  console.log(`${featureName}-${statusCode}`);
};

export const healthReportProject = (): void => {
  const featureStates = initFeatureStates();

  console.log("Project health report⚕️:");
  featureStates.map((featureState) => {
    consoleLogResult(
      featureState.feature,
      validateStatusCodes(featureState.result)
    );
  });
};

export const healthReportActivity = (): void => {
  console.log("Activity health report⚕️:");
};
