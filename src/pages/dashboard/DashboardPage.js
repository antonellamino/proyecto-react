import React, { useEffect, useState } from "react";
import axios from "axios";

import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from '../../components/NavBarComponent';
import HeaderComponent from '../../components/HeaderComponent';


const url = process.env.REACT_APP_BACK_URL;

function DashboardPage() {
    const [juegos, setJuegos] = useState([]);
    const [datosCargados, setDatosCargados] = useState(false);
    const [plataformas, setPlataformas] = useState([]);
    const [generos, setGeneros] = useState([]);

    const cargarDatos = () => {
        axios
            .get(`${url}/juegos`)
            .then((respuesta) => {
                setDatosCargados(true);
                setJuegos(respuesta.data.juegos);
            })
            .catch("error");

        axios
            .get(`${url}/plataformas`)
            .then((respuesta) => {
                setPlataformas(respuesta.data.plataformas);
            })
            .catch("error");

        axios
            .get(`${url}/generos`)
            .then((respuesta) => {
                setGeneros(respuesta.data.generos);
            })
            .catch("error");
    };

    useEffect(() => {
        cargarDatos();
    }, []);


    const decodificarImagen = (imgApi, tipo) => {
        const imagen = new Image();
        imagen.src = `data:image/${tipo};base64, ${imgApi}`;
        return imagen.src;
    }

    const filtrar = (e) => {
        e.preventDefault();
        const nombreInput = e.target.nombre.value;
        const plataforma = e.target.id_plataforma.value;
        const genero = e.target.id_genero.value;
        const orden = e.target.orden.value;
        // Creo un objeto para almacenar los parámetros de la solicitud
        const parametros = {};
        // Agrego los valores al objeto de parámetros solo si están presentes
        if (nombreInput) {
            parametros.nombre = nombreInput;
        }
        if (plataforma) {
            parametros.id_plataforma = plataforma;
        }
        if (genero) {
            parametros.id_genero = genero;
        }
        if (orden) {
            parametros.orden = orden;
        }

        // Construir la URL con los parámetros de la solicitud
        const consulta = new URLSearchParams(parametros).toString();
        const urlApi = `${url}/juegos?${consulta}`;

        // Realizo la solicitud a la API
        axios
            .get(urlApi)
            .then((respuesta) => {
                setJuegos(respuesta.data.juegos);
            })
            .catch((error) => {
                console.error(error);
            });
    };



    if (!datosCargados) {
        return <div>Cargando juegos...</div>;
    } else {
        return (
            <div>
                <NavBarComponent />
                <HeaderComponent />
                <h2>Filtrar juego:</h2>
                <div className="d-flex justify-content-center">
                    <form onSubmit={filtrar} className="bg-dark p-4">
                        <div className="mb-3 row">
                            <label htmlFor="nombre" className="col-sm-3 col-form-label text-light">Nombre:</label>
                            <div className="col-sm-9">
                                <input type="text" id="nombre" name="nombre" className="form-control" placeholder="Ingresa un nombre" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="plataforma" className="col-sm-3 col-form-label text-light">Plataforma:</label>
                            <div className="col-sm-9">
                                <select id="id_plataforma" name="id_plataforma" className="form-select">
                                    <option selected value="">Seleccionar</option>
                                    {plataformas.map((plataforma) => (
                                        <option key={plataforma.id} value={plataforma.id}>
                                            {plataforma.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="genero" className="col-sm-3 col-form-label text-light">Genero:</label>
                            <div className="col-sm-9">
                                <select id="id_genero" name="id_genero" className="form-select">
                                    <option selected value="">Seleccionar</option>
                                    {generos.map((genero) => (
                                        <option key={genero.id} value={genero.id}>
                                            {genero.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="orden" className="col-sm-3 col-form-label text-light">Orden:</label>
                            <div className="col-sm-9">
                                <select id="orden" name="orden" className="form-select">
                                    <option selected value="">Seleccionar</option>
                                    <option value="asc">Ascendente</option>
                                    <option value="desc">Descendente</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 text-center">
                            <button type="submit" className="btn btn-primary">
                                Filtrar
                            </button>
                        </div>
                    </form>

                </div>

                <div className="card-container">
                    <div className="row">
                        {juegos.map((juego) => (
                            <div key={juego.id} className="col-md-6">
                                <div className="card mb-3">
                                    <img
                                        className="card-img-top"
                                        src={decodificarImagen(juego.imagen, juego.tipo_imagen)}
                                        alt={juego.nombre}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{juego.nombre}</h5>
                                        <p className="card-text">
                                            <strong>{juego.nombre_genero}</strong>
                                        </p>
                                        <p className="card-text">
                                            <strong>{juego.nombre_plataforma}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }
}
export default DashboardPage;
