import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/errorNotification'
import SuccessNotification from './components/successNotification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

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

  const addBlog = async (blogObj) => {
    const returnedBlog = await blogService.create(blogObj)
    setBlogs(blogs.concat(returnedBlog))
    blogFormRef.current.toggleVisibility()
    setSuccessMessage(`a new blog ${returnedBlog.title} added by ${returnedBlog.author}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  function compare( a, b ) {
    if ( a.likes > b.likes ){
      return -1;
    }
    if ( a.likes < b.likes ){
      return 1;
    }
    return 0;
  }

  const blogsInOrder = () => {
    // sortataan blogit
    blogs.sort(compare)
    return (
      <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user}/>
      )}
      </div>
    )
  }


  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {!user && loginForm()}
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