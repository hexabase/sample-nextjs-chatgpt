import { HexabaseClient } from "@hexabase/hexabase-js";
import { Item } from "@hexabase/hexabase-js";
import { create } from "zustand";
import { CONVERSATIONS } from "@/common/constants/dataStoreHxb";
import Cookies from "js-cookie";
import { COOKIES_KEY } from "@/common/constants/cookie";

interface ListConversationParams {
  listData: any[];
  setListData: (listData: any[] | null) => void;
}

const useListConversationStore = create<ListConversationParams>((set: any) => ({
  listData: [],
  setListData: (data: any) =>
    set((state: any) => {
      return { ...state, listData: data };
    }),
}));

const useListConversation = async (client: HexabaseClient | null) => {
  let tempClient = client;
  if (tempClient == null) {
    tempClient = new HexabaseClient();
    let access_token = Cookies.get(COOKIES_KEY.ACCESS_TOKEN);
    if (access_token) tempClient.setToken(access_token);
    else return [];
  }
  const workspace = tempClient.workspace(process.env.NEXT_PUBLIC_WORKSPACE_ID);
  const project = await workspace.project(process.env.NEXT_PUBLIC_PROJECT_ID);
  const datastore = await project.datastore(CONVERSATIONS);
  const items = await datastore.items({
    page: 1,
    per_page: 10,
    use_display_id: true,
  });
  return items;
};

export { useListConversation, useListConversationStore };
