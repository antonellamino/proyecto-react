import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
const url = process.env.REACT_APP_BACK_URL;

function EditPage() {
    const { id } = useParams();
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/generos/${id}`);
                const fetchedName = response.data.nombre;
                setName(fetchedName);
            } catch (error) {
                console.error("Error al obtener el nombre:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes realizar alguna acción con el nombre ingresado, como enviarlo a través de una API o procesarlo localmente
        console.log("Nombre ingresado:", name);
    };

    const handleChange = (event) => {
        setName(event.target.value);
    };
    console.log(name);

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                    Nombre:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    value={name}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    );
}

export default EditPage;
