import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import FooterComponent from "../../components/FooterComponent";
import NavBarComponent from '../../components/NavBarComponent';
import HeaderComponent from '../../components/HeaderComponent';

const url = process.env.REACT_APP_BACK_URL;

function EditPlataforma() {
    const { id } = useParams();
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/generos/`);
                const fetchedName = response.data.nombre;
                setName(fetchedName);
            } catch (error) {
                console.error("Error al obtener el nombre:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Aquí realizas la solicitud a la API para enviar el nombre
            const response = await axios.put(`${url}/generos/${id}`, {
                nombre: name
            });
            
            console.log("Respuesta de la API:", response.data);
            
            // Puedes realizar alguna acción adicional después de enviar el nombre
            // ...
        console.log("Nombre ingresado:", name);
        } catch (error) {
            console.error("Error al enviar el nombre:", error);
        }
    };

    const handleChange = (event) => {
        setName(event.target.value);
    };
    console.log(name);

    return (
        <><NavBarComponent />
            <HeaderComponent />
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="nameInput" className="form-label">
                        Nombre:
                    </label>
                    <input type="text" className="form-control form-control-lg" id="nameInput" value={name} 
                    onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary px-5 my-3">Enviar</button>

            </form><FooterComponent /></>
    );
}

export default EditPlataforma;
