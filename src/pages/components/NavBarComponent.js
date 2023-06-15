import React from "react";


const NavBarComponent = () => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="nav navbar-nav">

                <a className="nav-item nav-link" href="/">Inicio</a>
                <a className="nav-item nav-link" href="/generos">Generos</a>
                <a className="nav-item nav-link" href="/plataformas">Plataformas</a>
            </div>
        </nav>
    );
};

export default NavBarComponent;
