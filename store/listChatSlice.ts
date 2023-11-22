import { List_Chat_Type } from '@/common/types/message';
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface ListChatState {
  values: List_Chat_Type[]
}

// Define the initial state using that type
const initialState: ListChatState = {
  values: [
    {
      title: 'Chat 1',
      created_at: '2023-03-03',
      updated_at: '2023-03-03',
      id: 3,
      path:'/3',
      message: []
    },
    {
      title: 'Chat 2',
      created_at: '2023-03-03',
      updated_at: '2023-03-03',
      id: 2,
      path:'/2',
      message: []
    }
  ]
}

export const ListChatSlice = createSlice({
  name: 'chat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNewChat: (state, payload) => {
      state.values.push(payload.payload);
    },
    updateConversation: (state, payload) => {
      
    }
  },
})

export const { addNewChat } = ListChatSlice.actions

export default ListChatSlice.reducer