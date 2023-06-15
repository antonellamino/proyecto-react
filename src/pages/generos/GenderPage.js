import React, { useEffect, useState } from "react";
import axios from "axios";

const url = process.env.REACT_APP_BACK_URL;

function GenderPage() {
  const [datosCargados, setDatosCargados] = useState(false);
  const [generos, setGeneros] = useState([]);

  const cargarDatos = () => {
    axios.get(`{url}/generos`)
      .then((response) => {
        console.log(response.data);
        setDatosCargados(true);
        setGeneros(response.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  if (!datosCargados) {
    return <div>Cargando..</div>;
  } else {
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
            </tr>
          </thead>
          <tbody>
            {generos.map((genero) => (
              <tr key={genero.id}>
                <td>{genero.id}</td>
                <td>{genero.name}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="">
                    <button type="button" className="btn btn-warning">
                      editar
                    </button>
                    <button type="button" className="btn btn-danger">
                      borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GenderPage;
