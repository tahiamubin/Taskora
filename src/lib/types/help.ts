export interface Help {
  _id: string;
  title: string;
  bug: string;
  tried: string;
  expected: string;
  questionLink: string;
  createdAt?: string;
  updatedAt?: string;
  author?: {
    _id: string;
    name: string;
    avatar?: string;
  };
}
