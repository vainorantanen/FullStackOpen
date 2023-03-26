import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Form, Button } from "react-bootstrap";

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }))
    dispatch(setNotification(`A new blog '${title}' by '${author}' added`, 5))
  };

  return (
    <div>
      <h4>Create a new blog</h4>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>title</Form.Label>
          <Form.Control
          id="title"
          placeholder="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          />
        <Form.Label>Author</Form.Label>
          <Form.Control
            id="author"
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        <Form.Label>URL</Form.Label>
        <Form.Control
        id="url"
        placeholder="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
