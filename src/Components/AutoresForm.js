import React, { useEffect, useState } from "react";
import axios from 'axios'

function AutoresForm({del, id, evento}){

    const[nombre, setNombre] = useState("");
    const[apellido, setApellido] = useState("");
    const[pais, setPais] = useState("");

    useEffect(() =>{
        
        if(id != undefined)
            obtener()
        else{
            setNombre("")
            setApellido("")
            setPais("")
        }
    },[id, del])

    async function obtener(){
        try{
            const res = await axios("https://denny2023.azurewebsites.net/api/autores/"+id)
            const data = await res.data;

            setNombre(data.nombre)
            setApellido(data.apellido)
            setPais(data.paisOrigen)              
        }
        catch(error){
            if(error.response.status == 404){
                alert("Registro no encontrado")
                document.querySelector("#btnCerrar").click()
            }
            else
                alert(error)
        }
    }

    async function guardar(){
        try{
            const autor = {
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }

            const res = await axios({
                method:'POST',
                url: 'https://denny2023.azurewebsites.net/api/autores',
                data: autor
            })
            const data = await res.data
            /*const res = await fetch("https://denny2023.azurewebsites.net/api/autores", 
                {method:"POST",
                headers:{'Content-Type': 'application/json;charset=UTF-8'},
                body:JSON.stringify(autor)})
                */
            //const data = await res.json()

            alert(data.message)
            if(data.status == 1){
                document.querySelector("#btnCerrar").click()
                evento()
            }
                
        }
        catch(error){
            alert(error)
        }
    }

    async function editar(){
        try{
            const autor = {
                autorId: id,
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }

            const res = await axios({
                method: "PUT",
                url: "https://denny2023.azurewebsites.net/api/autores",
                data: autor
            })
            const data = await res.data
            /*
            const res = await fetch("https://denny2023.azurewebsites.net/api/autores",{
                method: "PUT",
                headers:{'content-type': 'application/json; charset=utf-8'},
                body: JSON.stringify(autor)
            })
            const data = await res.json()
            */

            alert(data.message)

            if(data.status == 1){
                document.querySelector("#btnCerrar").click()
                evento()
            }

        }
        catch(error){
            alert(error)
        }
    }
    async function eliminar(){
        try{

            const res = await axios({
                method: "DELETE",
                url: "https://denny2023.azurewebsites.net/api/autores?id="+id
            })
            const data = res.data

            /*const res = await fetch("https://denny2023.azurewebsites.net/api/autores?id="+id, {
                method: "DELETE",
                headers:{ 'content-type': 'application/json; charset=utf-8' }
            })
            const data = await res.json()
            */

            alert(data.message)

            if(data.status == 1){
                document.querySelector("#btnCerrar").click()
                evento()
            }
        }
        catch(error){
            alert(error)
        }
    }

    function enviar(e){
        e.preventDefault()
        e.stopPropagation()

        let form = document.querySelector("#formulario")

        if(form.checkValidity()){
            if(id==undefined)
                guardar()
            else if(del==true)
                eliminar()
            else
                editar()
        }
        else{
            form.classList.add('was-validated')
        }

        
    }

    function cancelar(e){
        e.preventDefault()
        e.stopPropagation()
    }

    return(
        <div>
            <h1>Form</h1>
            {id != undefined?
            <div className="form-group">
                <label className="form-label">ID:</label>
                <input className="form-control" type="text" value={id} readOnly disabled />
            </div>
            :
            ""
            }
            <form id="formulario" className="row g-3 needs-validation" noValidate>
                <div className="form-group">
                    <label className="form-label">Nombre:</label>
                    <input className="form-control" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={del==true ? true : false} />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Complete el nombre.</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Apellido:</label>
                    <input className="form-control" type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)} disabled={del==true ? true : false} />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Complete el apellido.</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">País de origen:</label>
                    <input className="form-control" type="text" required value={pais} onChange={(e) => setPais(e.target.value)} disabled={del==true ? true : false} />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Complete el pais de origen.</div>
                </div>
                <div className="form-group mt-2">
                    <button onClick={e => enviar(e)} className={"btn " + (id==undefined ? "btn-success" : del==true ? "btn-danger" : "btn-primary") }>{id==undefined? "Guardar" : del==true? "Eliminar" : "Editar"}</button>
                    <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={e => cancelar(e)}>Cancelar</button>
                </div>
            </form>
            
        </div>
    )
}

export default AutoresForm