import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import "../index.css";

function Conteudo() {
  const history = useHistory();

  const logar = () => {
    history.push("/produtos");
  };

  return (
    <div className="loginBox">
      <Form>
        <div className="itensForm">
          <Form.Group>
            <h3>Login</h3>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Digite seu email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={() => logar()}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Conteudo;
