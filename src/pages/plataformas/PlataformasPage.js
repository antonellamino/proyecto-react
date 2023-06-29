import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from '../../components/NavBarComponent';
import HeaderComponent from '../../components/HeaderComponent';


const url = process.env.REACT_APP_BACK_URL;

function PlataformasPage() {
    const [datosCargados, setDatosCargados] = useState(false);
    const [plataformas, setplataformas] = useState([]);
    const [exito, setExito] = useState("");
    const [error, setError] = useState("");


    const cargarDatos = async () => {
        try {
            const respuesta = await axios.get(`${url}/plataformas`);
            console.log(respuesta.data); //borrar p entrega
            setDatosCargados(true);
            setplataformas(respuesta.data.plataformas);
        } catch (error) {
            setError(true); //chequear
        }
    };


    useEffect(() => {
        cargarDatos();
    }, []);

    const borrarPlataforma = async (id) => {
        try {
            const respuesta = await axios.delete(`${url}/plataformas/${id}`);
            setExito(respuesta.data.mensaje);
            setError(false);
            cargarDatos();
        } catch (error) {
            setError("Hubo un error");//ver esto
            setExito(false);
        }
    };

    if (!datosCargados) { //chequeo de spinner
        return <div className="text-center mt-5">
            <div className="spinner-border" role="status"></div>
            <h2>cargando juegos...</h2>
        </div>
    } else {
        return (
            <>
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
                            {plataformas.map((plataforma) => (
                                <tr key={plataforma.id}>
                                    <td>{plataforma.id}</td>
                                    <td>{plataforma.nombre}</td>
                                    <td className="text-end">
                                        <div className="btn-group" role="group" aria-label="">
                                            <Link to={`/plataformas/editar/${plataforma.id}`}>
                                                <button type="button" className="btn btn-warning">
                                                    editar
                                                </button>
                                            </Link>
                                            <Link to={`/plataformas`}>
                                                <button type="button" className="btn btn-danger" onClick={() => borrarPlataforma(plataforma.id)}>
                                                    eliminar
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Link to="/plataformas/agregar" className="btn btn-primary btn-cambio">
                        Agregar plataforma
                    </Link>
                </div>
                <FooterComponent />
            </>
        );
    }
}

export default PlataformasPage;
