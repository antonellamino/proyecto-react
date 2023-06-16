import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from '../../components/NavBarComponent';
import HeaderComponent from '../../components/HeaderComponent';


const url = process.env.REACT_APP_BACK_URL;

function PlatformPage() {
    const [datosCargados, setDatosCargados] = useState(false);
    const [plataformas, setplataformas] = useState([]);

    const cargarDatos = () => {
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

    if (!datosCargados) {
        return <div>Cargando..</div>;
    } else {
        return (

        <><HeaderComponent /><NavBarComponent /><div className="table-responsive">
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
                                <td>
                                    <div className="btn-group" role="group" aria-label="">
                                        <Link to={`/editarPlataforma/${plataforma.id}`}>
                                            <button type="button" className="btn btn-warning">
                                                editar
                                            </button>
                                        </Link>
                                        <Link to={`/borrar/${plataforma.id}`}>
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
                    Agregar plataforma
                </Link>
            </div>
            <FooterComponent />
            </>
        );
    }
}

export default PlatformPage;
