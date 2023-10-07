export type Task = {
  name: string;
  score: ItemScore;
  isCompleted: boolean;
  isAssigned: boolean;
  hasUnknownEstimatesLabel: boolean;
};

export const enum ItemScoreTypes {
  Assigned = "assigned",
  Unassigned = "unassigned",
  Undefined = "undefined",
}

export type ItemScore =
  | {
      type: ItemScoreTypes.Assigned;
      score: number;
    }
  | {
      type: ItemScoreTypes.Unassigned;
    }
  | {
      type: ItemScoreTypes.Undefined;
    };
