import CreateMessage from "@/components/molecules/createMessage";
import SystemMessage from "@/components/atoms/Message/System";
import MyMessage from "@/components/atoms/Message/Me";
import { FC, useState } from "react";
import { Message_Type, OpenAIChatRole } from "@/common/types/message";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useStore";
import { addNewChat } from "@/store/listChatSlice";
import { format } from "date-fns";
import { useHexabaseStore } from "@/hooks/useHexabase";

const HomeContainer: FC = () => {
  const { client } = useHexabaseStore();
  const [messages, setMessages] = useState<Message_Type[]>([]);

  const router = useRouter();
  const dispatch = useAppDispatch();

  console.log(client);

  const handleCreateMessage = async (message: string) => {
    const newMessage = {
      role: "user" as OpenAIChatRole,
      content: message,
    };
    setMessages([...messages, newMessage]);

    if (message) {
      const res = await fetch("/api/gpt");
      const data = await res.json();
      if (data?.success) {
        const newMessageData = [newMessage, data.data.message];
        setTimeout(() => {
          const newChat = {
            title: `new chat ${Date.now()}`,
            created_at: format(new Date(), "yyyy-MM-dd HH:mm:ss:SSS"),
            updated_at: format(new Date(), "yyyy-MM-dd HH:mm:ss:SSS"),
            id: Date.now(),
            path: `/${Date.now()}`,
            message: newMessageData,
          };
          dispatch(addNewChat(newChat));
          router.push(newChat.path);
          // setMessages([...messages, ...newMessageData]);
        }, 500);
      }
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="chat-container flex-grow">
        {messages?.length > 0 ? (
          <div className="lg:max-w-2xl lg:mx-auto">
            {messages.map((message, index) => {
              if (message.role === "system") {
                return <SystemMessage key={index}>{message.content}</SystemMessage>;
              }
              return <MyMessage key={index} children={message.content}></MyMessage>;
            })}
          </div>
        ) : (
          <div className="text-xl h-full flex items-center justify-center">New Chat</div>
        )}
      </div>
      <div>
        <CreateMessage onSubmit={handleCreateMessage} />
      </div>
    </div>
  );
};

export default HomeContainer;
