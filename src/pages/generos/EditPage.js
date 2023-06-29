import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from '../../components/NavBarComponent';
import HeaderComponent from '../../components/HeaderComponent';

const url = process.env.REACT_APP_BACK_URL;

function EditGenero() {
    const { id } = useParams();
    const [nom, setNom] = useState("");
    const [exito, setExito] = useState("");
    const [error, setError] = useState("");
    const [errorCatch, setErrorCatch] = useState(false);

    const getDatos = async () => {
        try {
            const respuesta = await axios.get(`${url}/generos`);
            const existe = respuesta.data.generos.filter((genero) => genero.id === parseInt(id)); 
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
    }, [id]); //se manda el id para indicar que el efecto se tiene que ejecutar cada vez que cambie el id (arreglo de dependencias)



    const eventoSubmit = async (e) => {
        e.preventDefault();
        if(nom === ""){
            setError("El nombre no puede estar vacio");
            setExito(false);
        } else {
            try {
                const respuesta = await axios.put(`${url}/generos/${id}`, { nombre : nom });//agregar la respuesta para q se muestre un mje
                setExito(respuesta.data.mensaje); //guardo el mje que responde la api para mostrar
            } catch (error) {
                setErrorCatch("Ocurio un error");
            }
        }
    };


    const eventoOnChange = (e) => {
        setNom(e.target.value); //obtengo el valor del input
        setError("");
        setExito("");
    };


    return (
        <><NavBarComponent />
        <HeaderComponent />
            {/* si exito tiene un valor, lo que esta entre () se ejecuta y se renderiza el componente */}
            {exito && <div className="alert alert-success" role="alert">{exito}</div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {errorCatch && <div className="alert alert-danger" role="alert">{errorCatch}</div>}
            <form className="form-edit" onSubmit={eventoSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="nameInput" className="form-label">
                        Nombre:
                    </label>
                    <input type="text" className="form-control" id="nameInput" value={nom} onChange={eventoOnChange} disabled={errorCatch}/>
                </div>
                <button type="submit" className="btn btn-primary btn-cambio" disabled={errorCatch}>Enviar</button>

            </form><FooterComponent /></>
    );
}

export default EditGenero;
