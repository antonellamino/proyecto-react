import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from '../../components/NavBarComponent';
import HeaderComponent from '../../components/HeaderComponent';

const url = process.env.REACT_APP_BACK_URL;

function EditPlataforma() {
    const { id } = useParams();
    const [nom, setNom] = useState("");
    const [exito, setExito] = useState("");
    const [error, setError] = useState("");
    const [errorCatch, setErrorCatch] = useState(false);


    const getDatos = async () => {
        try {
            const respuesta = await axios.get(`${url}/plataformas`);
            const existe = respuesta.data.plataformas.filter((plataforma) => plataforma.id === parseInt(id));
            const nombreId = existe[0].nombre;
            if (existe) {
                setNom(nombreId);
            }
        } catch (error) {
            setErrorCatch("El ID no existe");
        }
    };


    useEffect(() => {
        getDatos();
    }, [id]);


    const eventoSubmit = async (e) => {
        e.preventDefault();
        if (nom === "") {
            setError("El nombre no puede estar vacio");
            setExito(false);
        } else {
            try {
                const respuesta = await axios.put(`${url}/plataformas/${id}`, { nombre: nom });//agregar la respuesta para q se muestre un mje
                setExito(respuesta.data.mensaje); //guardo el mje que responde la api para mostrar
            } catch (error) {
                setErrorCatch("Ocurio un error");
            }
        }
    };

    const eventoOnChange = (e) => {
        setNom(e.target.value);
        setError("");
        setExito("");
    };

    return (
        <><NavBarComponent />
            <HeaderComponent />
            {exito && (<div className="alert alert-success" role="alert">{exito}</div>)}
            {error && (<div className="alert alert-danger" role="alert">{error}</div>)}
            {errorCatch && <div className="alert alert-danger" role="alert">{errorCatch}</div>}
            <form className="form-edit" onSubmit={eventoSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="nameInput" className="form-label">
                        Nombre:
                    </label>
                    <input type="text" className="form-control form-control-lg" id="nameInput" value={nom} onChange={eventoOnChange} disabled={errorCatch}/>
                </div>
                <button type="submit" className="btn btn-primary px-5 my-3 btn-cambio" disabled={errorCatch}>Enviar</button>

            </form><FooterComponent /></>
    );
}

export default EditPlataforma;
