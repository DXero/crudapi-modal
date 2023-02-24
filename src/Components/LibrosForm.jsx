import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function LibrosForm({del}){
    const[titulo, setTitulo] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[edicion, setEdicion] = useState("")
    const[isbn, setIsbn] = useState("")
    const[autorId, setAutorId] = useState(0)
    const[autores, setAutores] = useState([])

    const navigate = useNavigate()

    const{id} = useParams()

    useEffect(()=>{
        getAutores()
        if(id != undefined)
            getLibro()
    },[])

    async function getLibro(){
        try{
            const res = await axios("https://denny2023.azurewebsites.net/api/libros/"+id)
            const data = await res.data;

            setTitulo(data.titulo)
            setDescripcion(data.descripcion)
            setEdicion(data.edicion)
            setIsbn(data.isbn)
            setAutorId(data.autorId)
        }
        catch(error){
            if(error.response.status == 404){
                alert("Registro no encontrado")
                navigate("/libros")
            }
            else
                alert(error)
        }
    }

    async function eliminar(){
        try{

            const res = await axios({
                method: "DELETE",
                url: "https://denny2023.azurewebsites.net/api/libros?id="+id
            })
            const data = res.data

            alert(data.message)

            if(data.status == 1)
                navigate("/libros")
        }
        catch(error){
            alert(error)
        }
    }

    async function editar(){
        try{
            const libro = {
                libroId: id,
                titulo: titulo,
                descripcion: descripcion,
                edicion: edicion,
                isbn: isbn,
                autorId: autorId
            }

            const res = await axios({
                method: "PUT",
                url: "https://denny2023.azurewebsites.net/api/libros",
                data: libro
            })
            const data = await res.data

            alert(data.message)

            if(data.status == 1)
                navigate("/libros")

        }
        catch(error){
            alert(error)
        }
    }

    async function guardar(){
        try{
            const libro = {
                titulo: titulo,
                descripcion: descripcion,
                edicion: edicion,
                isbn: isbn,
                autorId: autorId
            }

            const res = await axios({
                method: "POST",
                url: "https://denny2023.azurewebsites.net/api/libros",
                data: libro
            })

            const data = await res.data

            alert(data.message)
            if(data.status == 1)
                navigate("/libros")
        }
        catch(error){
            alert(error)
        }
    }

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

    function enviar(e){
        e.preventDefault()
        e.stopPropagation()

        let form = document.querySelector("#formulario")

        if(form.checkValidity()){
            if(id==undefined)
                guardar()
            else if(del!=true)
                editar()
            else
                eliminar()
        }
        else{
            form.classList.add('was-validated')
        }
    }

    return(
        <div>
            <NavBar />
            <h1>Form</h1>
            {id!=undefined ?
                <div className="form-group">
                    <label className="form-label">Libro ID</label>
                    <input className="form-control" type="text" value={id} readOnly disabled />
                </div>
                :
                ""
            }
            
            <form id="formulario" className="row g-3 need-validation" noValidate>
                <div className="form-group">
                    <label className="form-label">Titulo</label>
                    <input className="form-control" type="text" required value={titulo} onChange={(e) => setTitulo(e.target.value)} disabled={del==true? true : false} />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Complete el campo.</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" type="text" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} disabled={del==true? true : false} />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Complete el campo.</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Edición</label>
                    <input className="form-control" type="number" required value={edicion} onChange={(e) => setEdicion(e.target.value)} disabled={del==true? true : false} />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Complete el campo.</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">ISBN</label>
                    <input className="form-control" type="text" required value={isbn} onChange={(e) => setIsbn(e.target.value)} disabled={del==true? true : false} />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Complete el campo.</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Autor</label>
                    <select className="form-select" value={autorId} onChange={(e) => setAutorId(e.target.value)} required disabled={del==true? true : false}>
                        <option value="">No seleccionado</option>
                        {autores.map((value, id) =>{
                            return <option value={value.autorId} key={id}>{value.nombre}</option>
                        })}
                    </select>
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Seleccione un autor.</div>
                </div>
                <div className="form-group mt-2">
                    <button onClick={e => enviar(e)} className={"btn " + (id==undefined ? "btn-success" : del==true ? "btn-danger" : "btn-primary") }>{id==undefined? "Guardar" : del==true? "Eliminar" : "Editar"}</button>
                    <button className="btn btn-secondary" onClick={() => navigate("/libros")}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default LibrosForm