import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import storageService from "./services/storage";
import usersService from './services/users'

import NewComment from "./components/NewComment";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { commentBlog, deleteBlog, initializeBlogs, likeBlog } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { setUser } from "./reducers/userReducer";

import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams
} from 'react-router-dom'

import { Table, Nav, Navbar, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)

  const blogs = useSelector(({blogs}) => {
    return blogs
  })

  const commentFormRef = useRef()

  const user = useSelector(({user}) => {
    return user
  })
  
  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    usersService.getAllUsers().then((users) => setUsers(users))
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [refreshKey])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      storageService.saveUser(user);
      dispatch(initializeUser(user))
      dispatch(setNotification("welcome!", 5))
    } catch (e) {
      dispatch(setNotification("wrong username or password", 5))
    }
  };

  const logout = async () => {
    setUser(null);
    storageService.removeUser();
    dispatch(initializeUser(null))
    dispatch(setNotification("logged out", 5))
  }; 

  const like = async (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`A like for the blog '${blog.title}' by '${blog.author}'`, 5));
  };
  
  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`The blog' ${blog.title}' by '${blog.author} removed`, 5))
    }
  };

  const addComment = async (blog, comment) => {
    dispatch(commentBlog(blog, comment))
    dispatch(setNotification("new comment added", 5))
    setRefreshKey(refreshKey+1)
    commentFormRef.current.toggleVisibility()
  }

  // tässä hieman komponentteja

  const BlogList = ({blogs}) => {
    return (
      <div>
        <Togglable buttonLabel="new blog" >
          <NewBlog />
        </Togglable>
        <div>
          <Table striped>
            <tbody>
              <tr>
                <th>
                  Blogs
                </th>
                <th>Authors</th>
              </tr>
            {blogs.slice().sort(byLikes).map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                like={() => like(blog)}
                canRemove={user && blog.user.username === user.username}
                remove={() => remove(blog)}
              />
            ))}
          </tbody>
          </Table>
        </div>
      </div>
    )
  }

  const User = ({user}) => {
    return (
        <tr>
          <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
          </td>
          <td>
            {user.blogs.length}
          </td>
        </tr>
    )
  }

  const UserPage = ({users}) => {
    const id = useParams().id
    var user;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        user = users[i]
      }
    }

    if (!user) {
      return null
    }
    return (
      <div>
        <h2>Page of {user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
        {user.blogs.map(b => 
        <li key={b.id}>
          {b.title}
        </li>
          )}
        </ul>
      </div>
    )
  }

  const Users = ({users}) => {
    return (
      <div>
        <h2>Users</h2>
          <Table striped>
            <tbody>
            <tr>
              <th>
                &nbsp;
              </th>
              <th>
                blogs created
              </th>
            </tr>
            {users.map((user) => (
              <User key={user.id}
                user={user}
              />
            ))}
            </tbody>
          </Table>
      </div>
    )
  }

  const BlogPage = ({blogs}) => {
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)
    if (!blog) {
      return null
    }
    
    return (
      <div>
        <h2>{blog.title}</h2>
        <p><a href="#">{blog.url}</a></p>
        <div>
            likes {blog.likes} <Button onClick={() => like(blog)}>like</Button>
        </div>
        <p>Added by {blog.author}</p>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map(c => (
            <li key={c}>{c}</li>
          )
          )}
        </ul>
        <div>
          <Togglable buttonLabel="add comment" ref={commentFormRef}>
            <NewComment addComment={addComment} blog={blog}/>
          </Togglable>
        </div>
      </div>
    )
  }

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
          {user.name} logged in
          </Nav.Link>
          <Button onClick={logout}>
            logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
    )
  }

  if (!user) {
    return (
      <div>
        <Notification  />
        <LoginForm login={login} />
      </div>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <Router>
    <div className="container">
      <Menu />
      <h2>Blog application</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserPage users={users} />} />
        <Route path="/blogs/:id" element={<BlogPage blogs={blogs} />} />
      </Routes>
    </div>
    </Router>
  );
};

export default App;
