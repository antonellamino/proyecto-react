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
    const [borrado, setBorrado] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const cargarDatos = async () => {
        axios
            .get(`${url}/plataformas`)
            .then((response) => {
                console.log(response.data);
                setDatosCargados(true);
                setplataformas(response.data.plataformas);
            })
            .catch(console.log);
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const borrarPlataforma = async (id) => {
        try {
            const response = await axios.delete(`${url}/plataformas/${id}`);
            setBorrado(true);
            setMensaje(response.data.mensaje);
            cargarDatos();
        } catch (error) {
            console.error(error);//que hacer con los errores
        }
    };

    if (!datosCargados) {
        return <div>Cargando..</div>;
    } else {
        return (
            <>
            <NavBarComponent />
            <HeaderComponent />
            {borrado && <div className="alert alert-success">{mensaje}</div>}
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
