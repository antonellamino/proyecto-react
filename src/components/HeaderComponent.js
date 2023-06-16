import React from "react";
import img from "../assets/img/logo1.jpg";
import ban from "../assets/img/Banner-Video-Juegos-.webp";


const HeaderComponent = () => {

    return (
        <>
        <header className="d-flex align-items-center">
            <img src={img} alt="logo" className="me-3" />
            <h1 className="m-0 mx-auto">GAMELAND</h1>
        </header>
        <img src={ban} alt="banner" className="w-100" />
        </>

    );
};


export default HeaderComponent;