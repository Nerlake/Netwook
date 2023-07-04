import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = { ...action.payload }
        },
        removeUser: (state) => {
            state.user = null
        },
        changeConversation: (state, action) => {
            state.conversation = action.payload
        },
        removeConversation: (state) => {
            state.conversation = null
        },
        updateUser: (state, action) => {
            state.user = action.payload
        }



    },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser, changeConversation, removeConversation, updateUser } = userSlice.actions

export default userSlice.reducer