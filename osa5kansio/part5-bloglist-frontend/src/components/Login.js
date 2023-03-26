
import { useState } from "react";
import {Form, Button} from 'react-bootstrap'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Username</Form.Label>
          <Form.Control value={username}
          onChange={({ target }) => setUsername(target.value)}
          id="username"/>
          <Form.Label>Password</Form.Label>
          <Form.Control
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="password"
          />
        <Button variant="primary" id="login-button" type="submit">
          login
        </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;