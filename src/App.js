import React from "react";
import './App.css';

import { BrowserRouter, Route, Routes} from "react-router-dom";

/*page component*/
import DashboardPage from "./pages/dashboard/DashboardPage";
import GenderPage from "./pages/generos/GenderPage";
import EditPage from "./pages/generos/EditPage";
import PlatformPage from "./pages/plataformas/PlataformasPage";

import "./assets/styles/index.css"


function App() {
  return (
    <><div className="container">
    </div><BrowserRouter>
        <Routes>
          <Route path={"/"} element={<DashboardPage />} />
          <Route path={"/generos"} element={<GenderPage />} />
          <Route path={"/editar/:id"} element={<EditPage />} />
          <Route path={"/plataformas"} element={<PlatformPage />} />
        </Routes>
      </BrowserRouter></>
  );
}
 //son ejemplos, llevan la ruta y el elemento que va a mostrar es el que le pongo entre llaves
 //hacer todo dentro de source
 //carpeta para componentes
 //carpeta de assets

 //extension bootstrap 4
 //extension simple react snippets

export default App;

