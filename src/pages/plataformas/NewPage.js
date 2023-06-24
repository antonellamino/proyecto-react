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

    const agregarPlataforma = async () => {
        try {
            const respuesta = await axios.post(`${url}/plataformas`, { nombre: nom });
            setExito(respuesta.data.mensaje);
            setName("");
        } catch (error) {
            console.error("Error al agregar la plataforma:", error); //como manejar el error
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if(nom === ""){
            setError("El nombre no puede estar vacio");
            return;
        }
        agregarPlataforma();
    };


    //captura el evento de cambio del campo del input
    const handleChange = (e) => {
        setName(e.target.value); //valor del input que se setea al name
        setError("");
        setExito(""); //limpia los mjes
    };

    return (
        <><NavBarComponent />
            <HeaderComponent />
            <form className="form-agregar" onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="nameInput" className="form-label">
                        Nombre plataforma:
                    </label>
                    <input type="text" className="form-control form-control-lg" id="nameInput" value={nom} onChange={handleChange}/>
                </div>
                {error && <h6 className="text-danger">{error}</h6>}
                {exito && <h6 className="text-success">{exito}</h6>}
                <button type="submit" className="btn btn-primary btn-cambio">Enviar</button>

            </form><FooterComponent /></>
    );
}

export default NewPlataforma;