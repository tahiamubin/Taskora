export interface PlanFormValues {
  title: string;
  company: string;
  targetDate: string; // "YYYY-MM-DD"
  userId: string;
}


export interface Topic {
  id: string;
  title: string;
  isDone: boolean;
}
export interface PrepPlan {
  _id: string;
  topics?: Topic[];
}

export interface CreateTopicPayload {
  planId: string;
  userId: string;
  title: string;
}

export interface ToggleTopicPayload {
  planId: string;
  topicId: string;
  userId: string;
  isDone: boolean;
}
