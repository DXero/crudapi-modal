import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tabla({filas, cols, controlador, evento}){

    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target={`#${controlador}Modal`} onClick={() => evento()}>Nuevo</button>
                        </th>
                        {cols.map((x,i) =>{
                                return <th key={i}>{x}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {filas.map((v,i) => {
                        return <tr key={i}>
                            <td>
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${controlador}Modal`} onClick={() => evento(Object.values(v)[0])}>Editar</button>
                                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#${controlador}Modal`} onClick={() => evento(Object.values(v)[0], true)}>Eliminar</button>
                            </td>
                            {Object.values(v).map((x,xi) =>{
                                return <td key={xi}>{x}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Tabla