import React, { useState } from "react";
import axios from "axios";
import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from '../../components/NavBarComponent';
import HeaderComponent from '../../components/HeaderComponent';

const url = process.env.REACT_APP_BACK_URL;

function NewPlataforma() {

    const [nom, setName] = useState("");
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");
    const [errorCatch, setErrorCatch] = useState(false);


    const agregarPlataforma = async () => {
        try {
            const respuesta = await axios.post(`${url}/plataformas`, { nombre: nom });
            setExito(respuesta.data.mensaje);
            setName("");
            setError(false);
        } catch (error) {
            setErrorCatch("El ID no existe");
        }
    };


    const eventoSubmit = async (e) => {
        e.preventDefault();
        if (nom === "") {
            setError("El nombre no puede estar vacio");
            setExito(false);
            return;
        }
        agregarPlataforma();
    };


    //captura el evento de cambio del campo del input
    const eventoOnChange = (e) => {
        setName(e.target.value); //valor del input que se setea al name
        setError("");
        setExito(""); //limpia los mjes
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
                        Nombre plataforma:
                    </label>
                    <input type="text" className="form-control form-control-lg" id="nameInput" value={nom} onChange={eventoOnChange} disabled={errorCatch} />
                </div>

                <button type="submit" className="btn btn-primary btn-cambio" disabled={errorCatch}>Enviar</button>

            </form><FooterComponent /></>
    );
}

export default NewPlataforma;