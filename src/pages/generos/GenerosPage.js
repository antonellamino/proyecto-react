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
  const [exito, setExito] = useState("");
  const [error, setError] = useState("");


  const cargarDatos = async () => {
    try {
      const respuesta = await axios.get(`${url}/generos`);
      console.log(respuesta.data); // borrar para entrega
      setDatosCargados(true);
      setGeneros(respuesta.data.generos);
    } catch (error) {
      setError(true); // a chequear
    }
  };

  //codigo que se ejecuta luego del primer render del componente, es un hook que permite definir efectos, se ejecuta 
  //cada vez que se renderice el componente.
  //primer parametro, funcion codigo a ejecutar
  //segundo parametro, lista de dependencias, opcional, es un array [], si no se pone se ejecuta siempre, si le pongo el [] es solo una vez
  //se ejecuta como minimo una vez, q es cuando se carga el componente
  useEffect(() => {
    cargarDatos();
  }, []);


  const borrarGenero = async (id) => {
    try {
      const respuesta = await axios.delete(`${url}/generos/${id}`);
      setExito(respuesta.data.mensaje);
      setError(false);
      cargarDatos();
    } catch (error) {
      setError("Hubo un error"); //ver esto
      setExito(false);
    }
  };


  if (!datosCargados) { //chequeo de spinner
    return <div className="text-center mt-5">
      <div className="spinner-border" role="status"></div>
      <h2>cargando juegos...</h2>
    </div>;
  } else {
    return (
      <div>
        <NavBarComponent />
        <HeaderComponent />
        {error && <h6 className="text-danger bg-dark">{error}</h6>}
        {exito && <div className="alert alert-success">{exito}</div>}
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
                      <Link to={`/generos/editar/${genero.id}`}>
                        <button type="button" className="btn btn-warning">
                          editar
                        </button>
                      </Link>
                      <Link to={`/generos`}>
                        <button type="button" className="btn btn-danger" onClick={() => borrarGenero(genero.id)}>
                          eliminar
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Link to="/generos/agregar" className="btn btn-primary btn-cambio">
            Agregar genero
          </Link>
        </div>

        <FooterComponent />
      </div>
    );
  }
}

export default GenderPage;
