export interface PlanFormValues {
  title: string;
  company: string;
  targetDate: string; // "YYYY-MM-DD"
  userId: string;
}

export interface Topic {
  _id: string;
  title: string;
  done: boolean;
}

export interface PrepPlan extends PlanFormValues {
  _id: string;
  topics: Topic[];
}
