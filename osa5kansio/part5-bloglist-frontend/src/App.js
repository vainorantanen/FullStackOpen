import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/errorNotification'
import SuccessNotification from './components/successNotification'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      console.log(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogout = async () => {
    //event.preventDefault()
    try {
      console.log("trying to log out")
      window.localStorage.removeItem('loggedBlogappUser')
      console.log("logged out succesfully")
    } catch (exception) {
      console.log("logout failed")
      setTimeout(() => {
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login to the application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>      
  )

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObj = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes : 0
    }

    const returnedBlog = await blogService.create(blogObj)
    setBlogs(blogs.concat(returnedBlog))

    setSuccessMessage(`a new blog ${blogObj.title} by ${blogAuthor} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)

    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>
      <button onClick={() => handleLogout()}>logout</button>

      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        Title: <input 
          type="text"
          value={blogTitle}
          onChange={handleTitleChange}
        />
        <br></br>
        Author: <input
          type="text"
          value={blogAuthor}
          onChange={handleAuthorChange}
        />
        <br></br>
        URL: <input 
          type="text"
          value={blogUrl}
          onChange={handleUrlChange}
        />
        <br></br>
        <button type="submit">Create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {!user && loginForm()}
      {user && blogForm()}

    </div>
  )
}

export default App