import React from "react";
import './App.css';

import { BrowserRouter, Route, Routes} from "react-router-dom";

/*page component*/
import DashboardPage from "./pages/dashboard/DashboardPage";
import GenderPage from "./pages/generos/GenderPage";
import NavBarComponent from './pages/components/NavBarComponent';
import FooterComponent from './pages/components/FooterComponent';
import HeaderComponent from './pages/components/HeaderComponent';

// import "./assets/styles/index.css"

const url = process.env.REACT_APP_BACK_URL;

function App() {
  return (
    <>
    <div className="container">
      <HeaderComponent />
      <NavBarComponent />
    </div>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<DashboardPage />} />
        <Route path={"/generos"} element={<GenderPage />} />
      </Routes>
    </BrowserRouter>
    <FooterComponent />
    </>
  );
}
 //son ejemplos, llevan la ruta y el elemento que va a mostrar es el que le pongo entre llaves
 //hacer todo dentro de source
 //carpeta para componentes
 //carpeta de assets

 //extension bootstrap 4
 //extension simple react snippets

export default App;

