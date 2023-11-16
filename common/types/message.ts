export interface Message_Type {
  type: string;
  content: string | React.ReactNode | React.ReactNode[] | undefined | null;
}

export interface List_Chat_Type {
  title: string;
  created_at: string;
  updated_at: string;
  id: string | number;
  path: string;
  message: Message_Type[];
}