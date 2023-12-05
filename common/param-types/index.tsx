// Define Interface here

export interface DefaultSearchList {
  page: number;
  per_page: number;
}

export interface ChatGPTParams {
  model: string;
  messages: any;
  stream?: boolean;
}

