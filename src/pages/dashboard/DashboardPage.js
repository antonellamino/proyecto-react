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
            .then((response) => {
                console.log(response.data);
                setDatosCargados(true);
                setJuegos(response.data.juegos);
            })
            .catch(console.log);

        axios
            .get(`${url}/plataformas`)
            .then((response) => {
                console.log(response.data);
                setPlataformas(response.data.plataformas);
            })
            .catch(console.log);

        axios
            .get(`${url}/generos`)
            .then((response) => {
                console.log(response.data);
                setGeneros(response.data.generos);
            })
            .catch(console.log);
    };

    useEffect(() => {
        cargarDatos();
    }, []);


    const decodificarImagen = (imgApi, tipo) => {
        const imagen = new Image();
        imagen.src = `data:image/${tipo};base64, ${imgApi}`;
        return imagen;
    }

    const handleFiltrar = (event) => {
        event.preventDefault();
        // Aquí puedes realizar la lógica de filtrado utilizando los valores seleccionados en el formulario
        console.log("Filtrar...");
    };


    if (!datosCargados) {
        return <div>Cargando juegos...</div>;
    } else {
        return (
            <div>
                <NavBarComponent />
                <HeaderComponent />
                <h2>Filtrar juego por:</h2>
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleFiltrar} className="bg-dark p-4">
                        <div className="mb-3 row">
                            <label htmlFor="nombre" className="col-sm-3 col-form-label text-light">Nombre:</label>
                            <div className="col-sm-9">
                                <input type="text" id="nombre" name="nombre" className="form-control" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="plataforma" className="col-sm-3 col-form-label text-light">Plataforma:</label>
                            <div className="col-sm-9">
                                <select id="plataforma" name="plataforma" className="form-select">
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
                                <select id="genero" name="genero" className="form-select">
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
                                    <option value="ascendente">Ascendente</option>
                                    <option value="descendente">Descendente</option>
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
                    {juegos.map((juego) => (
                        <div key={juego.id} className="card mb-3">
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
                    ))}
                </div>
                <FooterComponent />
            </div>
        )
    }
}
export default DashboardPage;
