import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/errorNotification'
import SuccessNotification from './components/successNotification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
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
      //console.log("trying to log out")
      window.localStorage.removeItem('loggedBlogappUser')
      //console.log("logged out succesfully")
    } catch (exception) {
      console.log('logout failed')
      setTimeout(() => {
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    const likedBlog = await blogService.update(blog)
    setBlogs(
      blogs.map(blog =>
        blog.id === likedBlog.id
          ? { ...blog, likes: likedBlog.likes }
          : blog
      )
    )
  }

  const handleBlogDelete = async (blog) => {
    //console.log(blog)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(
        blogs.filter(currnetBlog => currnetBlog.id !== blog.id)
      )
    }
  }

  const addBlog = async (blogObj) => {
    try {
      const returnedBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      setSuccessMessage(`a new blog ${returnedBlog.title} added by ${returnedBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Input invalid')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  function compare( a, b ) {
    if ( a.likes > b.likes ){
      return -1
    }
    if ( a.likes < b.likes ){
      return 1
    }
    return 0
  }

  const blogsInOrder = () => {
    // sortataan blogit
    blogs.sort(compare)
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike}
            handleBlogDelete={handleBlogDelete} loggedUser={user.username}/>
        )}
      </div>
    )
  }


  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {!user &&
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      }
      {user &&
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => handleLogout()}>logout</button>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <div>
          {blogsInOrder()}
        </div>
      </div>

      }

    </div>
  )
}

export default App