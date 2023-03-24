import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name : 'blogs',
    initialState : [],
    reducers : {
        appendBlogs(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { appendBlogs, setBlogs} = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
  }

export const createBlog = (content) => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch(appendBlogs(newBlog))
    }
  }

  export const likeBlog = (blog) => {
    return async dispatch => {
      await blogService.update(blog)
      const updatedBlog = await blogService.getAll()
      dispatch(setBlogs(updatedBlog))
    }
  }
export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export default blogSlice.reducer