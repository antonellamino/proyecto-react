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
    const [mjeExito, setMjeExito] = useState("");
    const [mjeError, setMjeError] = useState("");


    const getDatos = async () => {
        try {
            const respuesta = await axios.get(`${url}/plataformas`);
            const existe = respuesta.data.plataformas.filter((plataforma) => plataforma.id === parseInt(id)); //usodoble o triple? si no tengo q parsear a int, lo castee a int, salia en consola
            
            if (existe) {
                const nombreId = existe[0].nombre;
                setNom(nombreId);
            }
        } catch (error) {
            console.error(error); //ver manejo de error
        }
    };


    useEffect(() => {
        getDatos();
    }, [id]);


    const eventoSubmit = async (e) => {
        e.preventDefault();
        if (nom === "") {
            setMjeError("El nombre no puede estar vacio");
        } else {
            try {
                const respuesta = await axios.put(`${url}/plataformas/${id}`, { nombre: nom });//agregar la respuesta para q se muestre un mje
                setMjeExito(respuesta.data.mensaje); //guardo el mje que responde la api para mostrar
                setNom(""); //limpio el input
            } catch (error) {
                console.error(error);
            }
        }
    };

    const eventoInput = (e) => {
        setNom(e.target.value);
    };

    return (
        <><NavBarComponent />
            <HeaderComponent />
            {mjeExito && (<div className="alert alert-success" role="alert">
                {mjeExito}
            </div>)}
            {mjeError && (<div className="alert alert-danger" role="alert">
                {mjeError}
            </div>)}
            <form className="form-edit" onSubmit={eventoSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="nameInput" className="form-label">
                        Nombre:
                    </label>
                    <input type="text" className="form-control form-control-lg" id="nameInput" value={nom}
                        onChange={eventoInput}
                    />
                </div>
                <button type="submit" className="btn btn-primary px-5 my-3 btn-cambio">Enviar</button>

            </form><FooterComponent /></>
    );
}

export default EditPlataforma;
