export type OpenAIChatRole = "user" | "assistant" | "system" | "";

export interface Message_Type {
  role: OpenAIChatRole;
  content: string;
}

export interface List_Chat_Type {
  title: string;
  created_at: string;
  updated_at: string;
  id: string | number;
  path: string;
  message: Message_Type[];
}