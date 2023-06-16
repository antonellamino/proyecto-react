import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from '../../components/NavBarComponent';
import HeaderComponent from '../../components/HeaderComponent';

const url = process.env.REACT_APP_BACK_URL;

function GenderPage() {
  const [datosCargados, setDatosCargados] = useState(false);
  const [generos, setGeneros] = useState([]);

  const cargarDatos = () => {
    axios
      .get(`${url}/generos`)
      .then((response) => {
        console.log(response.data);
        setDatosCargados(true);
        setGeneros(response.data.generos);
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
      <div>
        <HeaderComponent />
        <NavBarComponent />
        <div className="table-responsive m-3">
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
                  <td>{genero.nombre}</td>
                  <td className="text-end">
                    <div className="btn-group" role="group" aria-label="">
                      <Link to={`/editar/${genero.id}`}>
                        <button type="button" className="btn btn-warning">
                          editar
                        </button>
                      </Link>
                      <Link to={`/borrar/${genero.id}`}>
                        <button type="button" className="btn btn-danger">
                          borrar
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/agregar" className="btn btn-secondary">
            Agregar Genero
          </Link>
        </div>

        <FooterComponent />
      </div>
    );
  }
}

export default GenderPage;
