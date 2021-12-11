import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";

function App() {
  const baseUrl = "http://localhost:8081/apiPaises/API/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [paisSeleccionado, setPaisSeleccionado] = useState({
    id: "",
    nombrepais: "",
    presidente: "",
    poblacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaisSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(paisSeleccionado);
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    var f = new FormData();
    f.append("nombrepais", paisSeleccionado.nombrepais);
    f.append("presidente", paisSeleccionado.presidente);
    f.append("poblacion", paisSeleccionado.poblacion);
    f.append("METHOD", "POST");
    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    var f = new FormData();
    f.append("nombrepais", paisSeleccionado.nombrepais);
    f.append("presidente", paisSeleccionado.presidente);
    f.append("poblacion", paisSeleccionado.poblacion);
    f.append("METHOD", "PUT");
    await axios
      .post(baseUrl, f, { params: { id: paisSeleccionado.id } })
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((pais) => {
          if (pais.id === paisSeleccionado.id) {
            pais.nombrepais = paisSeleccionado.nombrepais;
            pais.presidente = paisSeleccionado.presidente;
            pais.poblacion = paisSeleccionado.poblacion;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async () => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios
      .post(baseUrl, f, { params: { id: paisSeleccionado.id } })
      .then((response) => {
        setData(data.filter((pais) => pais.id !== paisSeleccionado.id));
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const seleccionarPais = (pais, caso) => {
    setPaisSeleccionado(pais);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <button
        className="btn btn-success"
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar
      </button>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Lanzamiento</th>
            <th>Desarrollador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pais) => (
            <tr key={pais.id}>
              <td>{pais.id}</td>
              <td>{pais.nombrepais}</td>
              <td>{pais.presidente}</td>
              <td>{pais.poblacion}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarPais(pais, "Editar")}
                >
                  Editar
                </button>{" "}
                {"  "}
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarPais(pais, "Eliminar")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Pais</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Pais: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombrepais"
              onChange={handleChange}
            />
            <br />
            <label>Presidente: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="presidente"
              onChange={handleChange}
            />
            <br />
            <label>Poblacion: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="poblacion"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>
            Insertar
          </button>
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Pais</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Pais: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombrepais"
              onChange={handleChange}
              value={paisSeleccionado && paisSeleccionado.nombrepais}
            />
            <br />
            <label>Presidente: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="presidente"
              onChange={handleChange}
              value={paisSeleccionado && paisSeleccionado.presidente}
            />
            <br />
            <label>Poblacion: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="poblacion"
              onChange={handleChange}
              value={paisSeleccionado && paisSeleccionado.poblacion}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>
            Editar
          </button>
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el Pais{" "}
          {paisSeleccionado && paisSeleccionado.nombrepais}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
