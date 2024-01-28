export type Offer = {
  id: string;
  date: string;
  content: string;
  source: string;
};

export type Filter = {
  text: string;
  filterWords: string[];
};
