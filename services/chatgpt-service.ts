import { api, chatGptAPI } from './api';
import { ChatGPTParams } from '../common/param-types';

class ChatGPTServiceApi {
    getResponseFromChatGPT = async (params: ChatGPTParams) => {
        return chatGptAPI.post(`/chat/completions`, params);
    };
}

export const chatGPTServiceApi = new ChatGPTServiceApi();