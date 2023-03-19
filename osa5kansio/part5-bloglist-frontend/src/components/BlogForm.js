import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes : 0
    })

    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>blogs</h2>

      <h2>Create new</h2>
      <form id='form' onSubmit={addBlog}>
        Title: <input
          id='title'
          type="text"
          value={blogTitle}
          onChange={event => setBlogTitle(event.target.value)}
        />
        <br></br>
        Author: <input
          id='author'
          type="text"
          value={blogAuthor}
          onChange={event => setBlogAuthor(event.target.value)}
        />
        <br></br>
        URL: <input
          id='url'
          type="text"
          value={blogUrl}
          onChange={event => setBlogUrl(event.target.value)}
        />
        <br></br>
        <button id='create' type="submit">Create</button>
      </form>
    </div>
  )
}


export default BlogForm