import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Tabla from "./Tabla"
import axios from 'axios'
import AutoresForm from "./AutoresForm"

function AutoresCrud(){

    const[autores, setAutores] = useState()
    const[id, setId] = useState()
    const[del, setDel] = useState()

    useEffect(() =>{
        getAutores()
    }, [])

    async function getAutores(){
        try{
            const res = await axios("https://denny2023.azurewebsites.net/api/autores")
            const data = await res.data

            setAutores(data)
        }
        catch(error){
            alert(error)
        }
    }

    function configurar(id, del){
        setId(id)
        setDel(del)
    }

    return (
        <div>
            <NavBar />
            <h1>CRUD Autores</h1>
            {autores==undefined ? 
            <h2><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div> Cargando...</h2>
            : <Tabla controlador="autores" filas={autores} cols={["ID", "Nombre", "Apellido", "Pais de origen"]} evento={configurar} />}



            <div className="modal fade" id="autoresModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Autores</h1>
                        <button type="button" id="btnCerrar" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <AutoresForm id={id} del={del} evento={getAutores} />
                    </div>
                    </div>
                </div>
            </div>
            



        </div>
    )
}

export default AutoresCrud


