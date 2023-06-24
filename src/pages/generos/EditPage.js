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
    const [mjeExito, setMjeExito] = useState("");
    const [mjeError, setMjeError] = useState("");


    const getDatos = async () => {
        try {
            const respuesta = await axios.get(`${url}/generos`);
            const jsonId = respuesta.data.generos.filter((genero) => genero.id === parseInt(id)); //usodoble o triple? si no tengo q parsear a int, lo castee a int, salia en consola
            const nombreId = jsonId[0].nombre;
            if (jsonId) {
                setNom(nombreId);
            }
        } catch (error) {
            console.error(error); //ver manejo del error, que hacer?
        }
    };


    useEffect(() => {
        getDatos();
    }, [id]); //se manda el id para indicar que el efecto se tiene que ejecutar cada vez que cambie el id (arreglo de dependencias)



    const eventoSubmit = async (e) => {
        e.preventDefault();
        if(nom === ""){
            setMjeError("El nombre no puede estar vacio");
        } else {
            try {
                const respuesta = await axios.put(`${url}/generos/${id}`, { nombre: nom });//agregar la respuesta para q se muestre un mje
                setMjeExito(respuesta.data.mensaje); //guardo el mje que responde la api para mostrar
                setNom(""); //limpio el input
            } catch (error) {
                console.error(error);
            }
        }
    };


    const eventoInput = (e) => {
        setNom(e.target.value); //obtengo el valor del input
    };


    return (
        <><NavBarComponent />
        <HeaderComponent />
            {/* si mjeexito tiene un valor, lo que esta entre () se ejecuta y se renderiza el componente */}
            {mjeExito && (<div className="alert alert-success" role="alert">
                {mjeExito}
            </div>)}
            {mjeError && (<div className="alert alert-danger" role="alert">
                {mjeError}
            </div>)}
            <form onSubmit={eventoSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="nameInput" className="form-label">
                        Nombre:
                    </label>
                    <input type="text" className="form-control" id="nameInput" value={nom} onChange={eventoInput} />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>

            </form><FooterComponent /></>
    );
}

export default EditGenero;
