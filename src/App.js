import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import AutoresCrud from "./Components/AutoresCrud";
import AutoresForm from "./Components/AutoresForm";
import Home from "./Components/Home"
import LibrosCrud from "./Components/LibrosCrud";
import LibrosForm from "./Components/LibrosForm";

function App(){

    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/autores" element={<AutoresCrud />} />
                    <Route path="/libros" element={<LibrosCrud />} />
                    <Route path="/libros/Add" element={<LibrosForm />} />
                    <Route path="/libros/Edit/:id" element={<LibrosForm />} />
                    <Route path="/libros/Delete/:id" element={<LibrosForm del={true} />} />
                </Routes>
            </BrowserRouter>
            
        </div>
    )
}

export default App