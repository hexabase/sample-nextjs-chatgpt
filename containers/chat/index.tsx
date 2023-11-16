import { Message_Type } from '@/common/types/message';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { addNewChat } from '@/store/listChatSlice';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CreateMessage from '@/components/molecules/createMessage';
import SystemMessage from '@/components/atoms/Message/System';
import MyMessage from '@/components/atoms/Message/Me';

function ChatContainer() {
  const [messages, setMessages] = useState<Message_Type[]>([
    {
      type: 'system',
      content: (
        <>
          Tính đến thời điểm kiến thức của tôi được cập nhật lần cuối vào tháng
          1 năm 2022, OpenAI cung cấp một số tùy chọn sử dụng GPT thông qua API
          của họ, bao gồm cả API GPT-3. Tuy nhiên, việc sử dụng API GPT không
          phụ thuộc vào việc bạn có tài khoản Premium hay đã thêm paycard hay
          không.
          <br />
          Để sử dụng API GPT, bạn cần đăng ký và có một tài khoản API từ OpenAI.
          Bạn sẽ nhận được một khóa API để sử dụng trong các yêu cầu của mình.
          Thông tin về việc thanh toán và cập nhật tài khoản sẽ liên quan đến
          quá trình đăng ký và quản lý tài khoản API của bạn trên trang web của
          OpenAI.
          <br />
          Hãy kiểm tra trang web chính thức của OpenAI hoặc liên hệ với họ trực
          tiếp để biết thông tin cụ thể nhất và cập nhật về chính sách và quy
          trình hiện tại của họ đối với việc sử dụng API GPT và thanh toán.
        </>
      ),
    },
    {
      type: 'user',
      content: 'duy thuong',
    },
  ]);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const messagesData = useAppSelector((state) => state.listChat.values);

  useEffect(() => {
    if (messagesData?.length) {
      const item = messagesData.find(
        (item) => item.id === Number(router.query.id)
      );
      if (item) {
        setMessages(item.message);
      }
    }
  }, [messagesData, router]);

  const handleCreateMessage = async (message: string) => {
    const newMessage = {
      type: 'user',
      content: message,
    };
    setMessages([...messages, newMessage]);

    if (message) {
      const res = await fetch('/api/gpt');
      const data = await res.json();
      if (data?.success) {
        const newMessageData = [newMessage, data.data.message];
        setTimeout(() => {
          setMessages([...messages, ...newMessageData]);
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
              if (message.type === 'system') {
                return (
                  <SystemMessage key={index}>{message.content}</SystemMessage>
                );
              }
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
