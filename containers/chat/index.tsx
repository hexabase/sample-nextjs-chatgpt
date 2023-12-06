"use client";
import { COOKIES_KEY } from "@/common/constants/cookie";
import { Message_Type, OpenAIChatRole } from "@/common/types/message";
import MyMessage from "@/components/atoms/Message/Me";
import SystemMessage from "@/components/atoms/Message/System";
import CreateMessage from "@/components/molecules/createMessage";
import { useChatCompletion } from "@/hooks/openAIStreamingHooks";
import {
  useCreateConversationMsg,
  useListConversationMsg,
  useListConversationMsgStore,
} from "@/hooks/useConversationMsgHook";
import cx from "classnames";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";

const ChatContainer: React.FC<{ id: string }> = ({ id }) => {
  const { listData, setListDataMsg } = useListConversationMsgStore();
  const [lstMessage, setLstMessage] = useState<Message_Type[]>([]);
  const [tempMsg, setTempMsg] = useState<Message_Type>({
    role: "assistant",
    content: "",
  });

  useEffect(() => {
    setLstMessage([]);
  }, [id]);

  const firstLoad = useMemo(async () => {
    if (id) {
      let lstConversationApi = await useListConversationMsg(id);
      setListDataMsg(lstConversationApi);
    }
  }, [id]);

  const lstConversationMsg = useMemo(() => {
    if (listData) {
      let convertedListData = listData.map((item) => {
        let objMsg = {
          content: item?.fields?.message,
          role: item?.fields?.role,
        };
        return objMsg;
      });
      setLstMessage(convertedListData);
      return convertedListData;
    } else return [];
  }, [listData]);

  const { messages, submitPrompt, loading, resetMessages } = useChatCompletion({
    model: process.env.NEXT_PUBLIC_GPT_MODEL, // Required
    apiKey: process.env.NEXT_PUBLIC_GPT_API_KEY, // Required
    temperature: 0.7,
  });

  useEffect(() => {
    if (messages.length > 0 && loading) {
      //Start stream
      let botStreamingMsg = { ...tempMsg };
      botStreamingMsg.content = messages[messages.length - 1].content;
      setTempMsg(botStreamingMsg);
    } else if (messages.length > 0 && !loading) {
      let botStreamingMsg = { ...tempMsg };
      let botStreamingMsgReset = { ...tempMsg };
      botStreamingMsg.content = messages[messages.length - 1].content;
      const newMessage = {
        conversation_id: id,
        ...botStreamingMsg,
        user_id: "",
      };
      useCreateConversationMsg(newMessage).then((message_id) => {
        if (message_id) {
          setLstMessage([...lstMessage, botStreamingMsg]);
          botStreamingMsgReset.content = "";
          setTempMsg(botStreamingMsgReset);
          resetMessages();
        } else console.log("CREATE MSG ERROR");
      });
    }
  }, [messages, loading]);

  const handleCreateMessage = async (message: string) => {
    if (message) {
      const newMessage = {
        conversation_id: id,
        role: "user" as OpenAIChatRole,
        content: message,
        user_id: Cookies.get(COOKIES_KEY.USER_ID),
      };

      let message_id = await useCreateConversationMsg(newMessage);
      if (message_id) {
        //CREATE message success
        submitPrompt([
          ...lstMessage,
          {
            role: "user",
            content: message,
          },
        ]);
        setLstMessage([...lstMessage, newMessage]);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className={cx(styles.chatContainer, "flex-grow overflow-x-auto")}>
        {[...lstMessage, tempMsg]?.length > 0 ? (
          <div className="lg:max-w-2xl lg:mx-auto">
            {[...lstMessage, tempMsg].map((message, index) => {
              if (message.role !== "user" && message.content) {
                return <SystemMessage key={index}>{message.content}</SystemMessage>;
              } else if (message.role === "user") return <MyMessage key={index} children={message.content}></MyMessage>;
            })}
          </div>
        ) : (
          <div className="text-xl h-full flex items-center justify-center">New Chat</div>
        )}
      </div>
      <div>
        <CreateMessage placeHolderText="Input your message" onSubmit={handleCreateMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
