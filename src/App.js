import React from "react";
import './App.css';

import { BrowserRouter, Route, Routes} from "react-router-dom";

/*page component*/
import DashboardPage from "./pages/dashboard/DashboardPage";
import GenderPage from "./pages/generos/GenerosPage";
import EditGenero from "./pages/generos/EditPage";
import NewGenero from "./pages/generos/NewPage";
import PlataformasPage from "./pages/plataformas/PlataformasPage";
import EditPlataforma from "./pages/plataformas/EditPage";
import NewPlataforma from "./pages/plataformas/NewPage";

import "./assets/styles/index.css"

function App() {
  return (
    <><div className="container">
    </div><BrowserRouter>
        <Routes>
          <Route path={"/"} element={<DashboardPage />} />
          <Route path={"/generos"} element={<GenderPage />} />
          <Route path={"/generos/editar/:id"} element={<EditGenero />} />
          <Route path={"/generos/agregar"} element={<NewGenero />} />
          <Route path={"/plataformas"} element={<PlataformasPage />} />
          <Route path={"/plataformas/agregar"} element={<NewPlataforma />} />
          <Route path={"/plataformas/editar/:id"} element={<EditPlataforma />} />
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

