import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'message',
    initialState : '',
    reducers: {
        setMessage(state, action) {
            console.log(action.payload)
            return action.payload
        },
        hideMessage() {
            return ''
        }
    }
})


export const { setMessage, hideMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
          dispatch(hideMessage())
        }, time*1000)
        
    }
  }

export default notificationSlice.reducer