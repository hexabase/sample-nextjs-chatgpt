import CreateMessage from "@/components/molecules/createMessage";
import { useCreateConversation, useListConversation, useListConversationStore } from "@/hooks/useConversationHook";
import { useListConversationMsgStore } from "@/hooks/useConversationMsgHook";
import { useAppDispatch } from "@/hooks/useStore";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const HomeContainer: FC = () => {
  const { setListData } = useListConversationStore();
  const { setListDataMsg } = useListConversationMsgStore();

  useEffect(() => {
    setListDataMsg([]);
  }, []);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCreateMessage = async (message: string) => {
    if (message) {
      let conversation_id = await useCreateConversation(message);
      if (conversation_id) {
        router.push(conversation_id);
        let lstConversationApi = await useListConversation();
        setListData(lstConversationApi);
      }
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="chat-container flex-grow">
        <div className="text-xl h-full flex items-center justify-center">New Chat</div>
      </div>
      <div>
        <CreateMessage placeHolderText="Input new conversation name" onSubmit={handleCreateMessage} />
      </div>
    </div>
  );
};

export default HomeContainer;
