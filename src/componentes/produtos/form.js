import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FormProdutos() {
  const criaFormEmBranco = () => {
    return {
      nome: "",
      preco: 0.0,
      foto: "",
    };
  };

  const [form, setForm] = useState(criaFormEmBranco());
  const { idProduto } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (idProduto !== undefined) {
      axios
        .get(`http://localhost:3001/produtos/${idProduto}`)
        .then((res) => setForm(res.data));
    }
  }, [idProduto]);

  const setValor = (evento, campo) => {
    setForm({ ...form, [campo]: evento.target.value });
  };

  const limparCampos = () => {
    setForm({ nome: "", preco: 0.0, foto: "" });
  };

  const submeter = (evento) => {
    evento.preventDefault();
    if (idProduto === undefined) {
      axios.post("http://localhost:3001/produtos/novo", form).then((res) => {
        if (res.statusText === "OK") history.push("/produtos");
      });
    } else {
      axios
        .put(`http://localhost:3001/produtos/editar/${idProduto}`, form)
        .then((res) => {
          if (res.statusText === "OK") history.push("/produtos");
          history.push("/produtos");
        });
    }
  };

  return (
    <Form onSubmit={(e) => submeter(e)}>
      <Form.Group controlId="campoNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setValor(e, "nome")}
        />
      </Form.Group>
      <Form.Group controlId="campoPreco">
        <Form.Label>Preço</Form.Label>
        <Form.Control
          type="number"
          min="0"
          step="0.01"
          value={form.preco}
          onChange={(e) => setValor(e, "preco")}
        />
      </Form.Group>
      <Form.Group controlId="campoFoto">
        <Form.Label>Foto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Foto"
          value={form.foto}
          onChange={(e) => setValor(e, "foto")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Gravar
      </Button>
      &nbsp;
      <Button variant="secondary" type="button" onClick={() => limparCampos()}>
        Limpar
      </Button>
    </Form>
  );
}

export default FormProdutos;
