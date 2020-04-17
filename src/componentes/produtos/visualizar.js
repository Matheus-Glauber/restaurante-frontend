import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";

function VisualizarProduto() {
  const { idProduto } = useParams();
  const history = useHistory();
  const [produto, setProduto] = useState({});

  useEffect(() => {
    setProduto(
      axios
        .get(`http://localhost:3001/produtos/${idProduto}`)
        .then((res) => setProduto(res.data))
    );
  }, [idProduto]);

  const formataDinheiro = (valor) => {
    if (valor !== undefined) {
      return "R$ " + parseFloat(valor).toFixed(2).replace(".", ",");
    }

    return "R$ 0,00";
  };

  const removerProduto = (evento) => {
    evento.preventDefault();
    axios.delete(`http://localhost:3001/produtos/${idProduto}`).then((res) => {
      if (res.statusText === "OK") history.push("/produtos");
    });
  };

  return (
    <Card className="detalheProduto">
      <Card.Img variant="top" src={produto.foto} alt="Foto do Produto" />
      <Card.Body>
        <Card.Title>{produto.nome}</Card.Title>
        <Card.Text>Preço: {formataDinheiro(produto.preco)}</Card.Text>
      </Card.Body>
      <Card.Body>
        <LinkContainer to={"/produtos/editar/" + idProduto}>
          <Card.Link className="btn btn-primary" href="#">
            Editar
          </Card.Link>
        </LinkContainer>
        <Card.Link
          onClick={(e) => removerProduto(e)}
          className="btn btn-danger"
          href="#"
        >
          Remover
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default VisualizarProduto;
