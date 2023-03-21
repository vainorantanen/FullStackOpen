import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'message',
    initialState : '',
    reducers: {
        setMessage(state, action) {
            console.log(action.payload)
            return action.payload
        },
        hideMessage(state, action) {
            return ''
        }
    }
})


export const { setMessage, hideMessage } = notificationSlice.actions
export default notificationSlice.reducer