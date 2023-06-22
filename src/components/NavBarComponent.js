import React from "react";

const NavBarComponent = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2 fixed-top">
            <div className="navbar-nav mx-auto w-100">
                <a className="nav-item nav-link col text-center" href="/">
                    Inicio
                </a>
                <a className="nav-item nav-link col text-center" href="/generos">
                    Generos
                </a>
                <a className="nav-item nav-link col text-center" href="/plataformas">
                    Plataformas
                </a>
            </div>
        </nav>
    );
};

export default NavBarComponent;

