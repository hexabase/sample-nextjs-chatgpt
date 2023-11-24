import { Message_Type, OpenAIChatRole } from '@/common/types/message';
import MyMessage from '@/components/atoms/Message/Me';
import SystemMessage from '@/components/atoms/Message/System';
import CreateMessage from '@/components/molecules/createMessage';
import { useChatCompletion } from '@/hooks/openAIStreamingHooks';
import { useEffect, useState } from 'react';

function ChatContainer() {
  const [lstMessage, setLstMessage] = useState<Message_Type[]>([])
  const [tempMsg, setTempMsg] = useState<Message_Type>({
    role: "assistant",
    content: ""
  })

  const {
    messages,
    submitPrompt,
    loading,
    resetMessages,
  } = useChatCompletion({
    model: process.env.NEXT_PUBLIC_GPT_MODEL, // Required
    apiKey: process.env.NEXT_PUBLIC_GPT_API_KEY, // Required
    temperature: 0.7,
  });

  useEffect(() => {
    if (messages.length > 0 && loading) {
      //Start stream
      let botStreamingMsg = { ...tempMsg }
      botStreamingMsg.content = messages[messages.length - 1].content
      setTempMsg(botStreamingMsg)
    } else if (messages.length > 0 && !loading) {
      let botStreamingMsg = { ...tempMsg }
      let botStreamingMsgReset = { ...tempMsg }
      botStreamingMsg.content = messages[messages.length - 1].content
      setLstMessage([...lstMessage, botStreamingMsg]);
      botStreamingMsgReset.content = ""
      setTempMsg(botStreamingMsgReset)
      resetMessages()
    }
  }, [messages, loading])


  const handleCreateMessage = async (message: string) => {
    if (message) {
      submitPrompt([
        ...lstMessage,
        {
          role: "user",
          content: message,
        },
      ]);

      const newMessage = {
        role: "user" as OpenAIChatRole,
        content: message,
      };
      setLstMessage([...lstMessage, newMessage]);
    }
  };


  return (
    <div className="flex flex-col h-full">
      <div className="chat-container flex-grow">
        {[...lstMessage, tempMsg]?.length > 0 ? (
          <div className="lg:max-w-2xl lg:mx-auto">
            {[...lstMessage, tempMsg].map((message, index) => {
              if (message.role !== 'user' && message.content) {
                return (
                  <SystemMessage key={index}>{message.content}</SystemMessage>
                );
              } else if (message.role === 'user')
                return (
                  <MyMessage key={index} children={message.content}></MyMessage>
                );
            })}
          </div>
        ) : (
          <div className="text-xl h-full flex items-center justify-center">
            New Chat
          </div>
        )}
      </div>
      <div>
        <CreateMessage onSubmit={handleCreateMessage} />
      </div>
    </div>
  );
}

export default ChatContainer;
