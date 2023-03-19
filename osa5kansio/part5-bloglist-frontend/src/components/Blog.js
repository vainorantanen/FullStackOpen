import { useState } from 'react'

const Blog = ({ blog,
  handleLike,
  handleBlogDelete,
  loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showState, setShowState] = useState(false)

  const deleteButton = () => {
    if (blog.user.username === loggedUser) {
      return (
        <button id='delete' onClick={() => handleBlogDelete(blog)}>Remove</button>
      )
    }
  }

  if (!showState) {
    return (
      <div style={blogStyle}>
        {blog.title} <button id='view' onClick={() => setShowState(!showState)}>
          View
        </button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setShowState(!showState)}>
          Hide
      </button>
      <br></br>
      {blog.url} <br></br>
        likes: {blog.likes} <button id='like' onClick={() => handleLike(blog)}>Like</button> <br></br>
      {blog.author} <br></br>
      <div>
        {deleteButton()}
      </div>
    </div>
  )

}

export default Blog