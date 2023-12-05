import { HexabaseClient } from "@hexabase/hexabase-js";
import { Item } from "@hexabase/hexabase-js";
import { create } from "zustand";
import { CONVERSATION_MESSAGES } from "@/common/constants/dataStoreHxb";
import Cookies from "js-cookie";
import { COOKIES_KEY } from "@/common/constants/cookie";

interface ListConversationMsgParams {
  listData: any[];
  setListDataMsg: (listData: any[] | null) => void;
}

const useListConversationMsgStore = create<ListConversationMsgParams>((set: any) => ({
  listData: [],
  setListDataMsg: (data: any) =>
    set((state: any) => {
      return { ...state, listData: data };
    }),
}));

const useListConversationMsg = async (conversation_id: string | string[]) => {
  const client = new HexabaseClient();
  let access_token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
  if (access_token) client.setToken(access_token);
  else return [];

  const workspace = client.workspace(process.env.NEXT_PUBLIC_WORKSPACE_ID);
  const project = await workspace.project(process.env.NEXT_PUBLIC_PROJECT_ID);
  const datastore = await project.datastore(CONVERSATION_MESSAGES);
  const items = await datastore.items({
    page: 1,
    per_page: 0,
    use_display_id: true,
    conditions: [
      {
        id: "conversation_id",
        search_value: [conversation_id],
        exact_match: true,
      },
    ],
    // sort_field_id: "created_at",
    // sort_order: "desc",
  });
  return items;
};

const useCreateConversationMsg = async (objConversationMsg: any) => {
  const client = new HexabaseClient();
  let access_token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
  if (access_token) client.setToken(access_token);
  else return undefined;

  const workspace = client.workspace(process.env.NEXT_PUBLIC_WORKSPACE_ID);
  const project = await workspace.project(process.env.NEXT_PUBLIC_PROJECT_ID);
  const datastore = await project.datastore(CONVERSATION_MESSAGES);
  const item = await datastore.item();
  item.set("message", objConversationMsg?.content);
  item.set("conversation_id", objConversationMsg?.conversation_id);
  item.set("user_id", objConversationMsg?.user_id);
  item.set("role", objConversationMsg?.role);
  await item.save();
  return item.id;
};

export { useListConversationMsg, useListConversationMsgStore, useCreateConversationMsg };
