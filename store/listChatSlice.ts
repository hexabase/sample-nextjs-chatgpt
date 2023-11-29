import { List_Chat_Type } from '@/common/types/message';
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface ListChatState {
  values: List_Chat_Type[]
}

// Define the initial state using that type
const initialState: ListChatState = {
  values: [
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