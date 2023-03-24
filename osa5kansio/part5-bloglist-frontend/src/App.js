import { /*useState*/ useEffect, useRef } from "react";
import Blog from "./components/Blog";
//import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, initializeBlogs, likeBlog } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch()
  //const [blogs, setBlogs] = useState([]);
  //const [user, setUser] = useState("");
  //const [info, setInfo] = useState({ message: null });
  const blogs = useSelector(({blogs}) => {
    //console.log("BLOGS: ", blogs)
    return blogs
  })

  const blogFormRef = useRef();

  const user = useSelector(({user}) => {
    //console.log("USER: ", user)
    return user
  })
  
  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  /*
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);*/
  /*
  const notifyWith = (message, type = "info") => {
    setInfo({
      message,
      type,
    });

    setTimeout(() => {
      setInfo({ message: null });
    }, 3000);
  };
  */
  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      storageService.saveUser(user);
      //notifyWith("welcome!");
      dispatch(initializeUser(user))
      dispatch(setNotification("welcome!", 5))
    } catch (e) {
      //notifyWith("wrong username or password", "error");
      dispatch(setNotification("wrong username or password", 5))
    }
  };

  const logout = async () => {
    setUser(null);
    storageService.removeUser();
    //notifyWith("logged out");
    dispatch(initializeUser(null))
    dispatch(setNotification("logged out", 5))
  };
  /*
  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.create(newBlog);
    //notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    dispatch(setNotification(`A new blog '${newBlog.title}' by '${newBlog.author}' added`, 5))
    setBlogs(blogs.concat(createdBlog));
    blogFormRef.current.toggleVisibility();
  };
  */  

  const like = async (blog) => {
    //const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    //const updatedBlog = await blogService.update(blogToUpdate);
    // täs oli vaa setNotification tilal notifyWith
    dispatch(likeBlog(blog))
    console.log("BLOGIT", blogs)
    dispatch(setNotification(`A like for the blog '${blog.title}' by '${blog.author}'`, 5));
  };
  
  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      //notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`The blog' ${blog.title}' by '${blog.author} removed`, 5))
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification /*info={info}*/ />
        <LoginForm login={login} />
      </div>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification /*info={info}*/ />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlog /*createBlog={createBlog}*/ />
      </Togglable>
      <div>
        {blogs.slice().sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
