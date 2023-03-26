import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NewComment = ({addComment, blog}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addComment(blog, comment)
  };

  return (
    <div>
      <h4>Add a comment</h4>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Write a comment</Form.Label>
            <Form.Control
            id="comment"
            placeholder="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            />
        <Button type="submit">Add</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewComment;
