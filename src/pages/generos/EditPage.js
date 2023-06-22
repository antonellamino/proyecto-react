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


    const getDatos = async() => {
        try {
            const respuesta = await axios.get(`${url}/generos`);
            const jsonId = respuesta.data.generos.filter((genero) => genero.id == id); //usodoble o triple? si no tengo q parsear a int
            const nombreId = jsonId[0].nombre;
            if(jsonId){
                setNom(nombreId);
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getDatos();
    }, [id]); //se manda el id para indicar que el efecto se tiene que ejecutar cada vez que cambie el id (arreglo de dependencias)


    const eventoSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.put(`${url}/generos/${id}`, { //agregar la respuesta para q se muestre un mje
                nombre: nom
            });
        } catch (error) {
            console.error(error);
        }
    };

    const eventoInput = (e) => {
        setNom(e.target.value);
    };
    return (
        <><NavBarComponent />
            <HeaderComponent />
            <form onSubmit={eventoSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="nameInput" className="form-label">
                        Nombre:
                    </label>
                    <input type="text" className="form-control form-control-lg" id="nameInput" value={nom} onChange={eventoInput}/>
                </div>
                <button type="submit" className="btn btn-primary px-5 my-3">Enviar</button>

            </form><FooterComponent /></>
    );
}

export default EditGenero;
