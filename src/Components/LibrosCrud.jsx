import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import axios from "axios"
import Tabla from "./Tabla";

function LibrosCrud(){

    const[libros, setLibros] = useState()

    useEffect(() => {
        getLibros()
    }, [])

    async function getLibros(){
        try{
            const res = await axios("https://denny2023.azurewebsites.net/api/libros")
            const data = await res.data
            
            setLibros(data)
        }
        catch(error){
            alert(error)
        }
    }


    return(
        <div>
            <NavBar />
            <h1>CRUD Libros</h1>
            {
                libros == undefined ?
                    <h2><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div> Cargando...</h2>
                :
                    <Tabla controlador="libros" filas={libros} cols={["LibroId", "Titulo", "Descripción", "Edición", "ISBN", "AutorId", "Nombre", "Apellido"]} />
            }
        </div>
    )
}

export default LibrosCrud