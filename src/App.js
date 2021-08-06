import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { IdDelSegmento: 1, DireccionDelSegmento: "carrera 50#23", CantidadDeCalzadasYBordillos: "3 calzadas y 2 bordillos" },
  { IdDelSegmento: 2, DireccionDelSegmento: "carrera 80#45", CantidadDeCalzadasYBordillos: "2 calzadas y 2 bordillos" },
  { IdDelSegmento: 3, DireccionDelSegmento: "calle 35#25", CantidadDeCalzadasYBordillos: "4 calzadas y 3 bordillos" },
  { IdDelSegmento: 4, DireccionDelSegmento: "avenida 16#32d", CantidadDeCalzadasYBordillos: "5 calzadas y 5 bordillos" },
  { IdDelSegmento: 5, DireccionDelSegmento: "carrera 30#43c", CantidadDeCalzadasYBordillos: "6 calzadas y 4 bordillos"},
  { IdDelSegmento: 6, DireccionDelSegmento: "circular 2#45a", CantidadDeCalzadasYBordillos: "5 calzadas y 3 bordillos" },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      IdDelSegmento: "",
      DireccionDelSegmento: "",
      CantidadDeCalzadasYBordillos: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.IdDelSegmento == registro.IdDelSegmento) {
        arreglo[contador].DireccionDelSegmento = dato.DireccionDelSegmento;
        arreglo[contador].CantidadDeCalzadasYBordillos = dato.CantidadDeCalzadasYBordillos;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.IdDelSegmento);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.IdDelSegmento == registro.IdDelSegmento) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.IdDelSegmento=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>insertar segmento</Button>
          <br /><br />
          <Table>
            <thead>
              <tr>
                <th>Id Del Segmento</th>
                <th>Direccion Del Segmento</th>
                <th>Cantidad De Calzadas Y Bordillos</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.IdDelSegmento}>
                  <td>{dato.IdDelSegmento}</td>
                  <td>{dato.DireccionDelSegmento}</td>
                  <td>{dato.CantidadDeCalzadasYBordillos}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
              Id Del Segmento:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.IdDelSegmento}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Direccion Del Segmento: 
              </label>
              <input
                className="form-control"
                name="DireccionDelSegmento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.DireccionDelSegmento}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Cantidad De Calzadas Y Bordillos: 
              </label>
              <input
                className="form-control"
                name="CantidadDeCalzadasYBordillos"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.CantidadDeCalzadasYBordillos}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar segmento</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id Del Segmento: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Direccion Del Segmento: 
              </label>
              <input
                className="form-control"
                name="DireccionDelSegmento"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Cantidad De Calzadas Y Bordillos: 
              </label>
              <input
                className="form-control"
                name="CantidadDeCalzadasYBordillos"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
