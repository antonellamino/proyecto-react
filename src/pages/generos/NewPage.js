import React, { useState } from "react";
import axios from "axios";
import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from '../../components/NavBarComponent';
import HeaderComponent from '../../components/HeaderComponent';

const url = process.env.REACT_APP_BACK_URL;

function NewGenero() {

    const [nom, setNom] = useState("");
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");
    const [errorCatch, setErrorCatch] = useState(false);


    const agregarGenero = async () => {
        try {
            const respuesta = await axios.post(`${url}/generos`, { nombre: nom });
            setExito(respuesta.data.mensaje);
            setNom("");
            setError(false);
        } catch (error) {
            setErrorCatch("Ocurrió un error");
        }
    };


    const eventoSubmit = async (e) => {
        e.preventDefault();
        if (nom === "") {
            setError("El nombre no puede estar vacío");
            setExito(false);
            return;
        }
        agregarGenero();
    };


    //captura el evento de cambio del campo del input
    const eventoOnChange = (e) => {
        setNom(e.target.value); //valor del input que se setea al name
        setError("");
        setExito("");
    };

    return (
        <><NavBarComponent />
            <HeaderComponent />
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {exito && <div className="alert alert-success" role="alert">{exito}</div>}
            {errorCatch && <div className="alert alert-danger" role="alert">{errorCatch}</div>}
            <form className="form-edit" onSubmit={eventoSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="nameInput" className="form-label">
                        Nombre genero:
                    </label>
                    <input type="text" className="form-control form-control-lg" id="nameInput" value={nom} onChange={eventoOnChange} disabled={errorCatch}/>
                </div>

                <button type="submit" className="btn btn-primary btn-cambio" disabled={errorCatch}>Enviar</button>

            </form><FooterComponent /></>
    );
}

export default NewGenero;