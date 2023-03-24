import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'

const userSlice = createSlice({
    name : 'user',
    initialState : '',
    reducers : {
      setUser(state, action) {
        return action.payload
      }
    }
  })

  export const initializeUser = () => {
    return async dispatch => {
      const user = await storageService.loadUser()
      dispatch(setUser(user))
    }
  }

  export const { setUser } = userSlice.actions

  export default userSlice.reducer