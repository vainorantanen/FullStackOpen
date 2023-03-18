import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showState, setShowState] = useState(false)

  const likeBlog = async (blogId) => {
    //console.log(blogs)
    const findBlogToUpdate = blogs.find(b => b.id === blogId)
    //console.log(findBlogToUpdate)
    let newlikes = findBlogToUpdate.likes +1
    
    const updatedBlog = { ...findBlogToUpdate, likes: newlikes}
    //console.log(updatedBlog)
    blogService.update(blogId, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== findBlogToUpdate.id ? b : returnedBlog))
      })
  }

  const deleteBlog = (blogId) => {
    const blogToDelete = blogs.find(b => b.id === blogId)

    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      blogService.remove(blogId).then(removedBlog => {
        blogs.map(b => b.id !== blogId ? b : removedBlog)
      })
      setBlogs(blogs.filter(b => b.id !== blogId))
    }
  }


    console.log(user.username)
    console.log(blog.user)
  
  

  if (!showState) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setShowState(!showState)}>
          View
        </button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setShowState(!showState)}>
          Hide
        </button>
        <br></br>
        {blog.url} <br></br>
        likes: {blog.likes} <button onClick={() => likeBlog(blog.id)}>Like</button> <br></br>
        {blog.author} <br></br>
          {user.username === blog.user.username && 
          <button onClick={() => deleteBlog(blog.id)}>Remove</button>
          }
      </div>
    )
  }
}
  
  export default Blog