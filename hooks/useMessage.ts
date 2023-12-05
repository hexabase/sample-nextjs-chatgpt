import { chatGPTServiceApi } from '@/services/chatgpt-service';
import { useMutation } from '@tanstack/react-query';

const { getResponseFromChatGPT } = chatGPTServiceApi;

export const useMessageMutation = () => {

  const chatGPTMutation = useMutation({
    mutationFn: getResponseFromChatGPT,
  });

  return { chatGPTMutation };
};
