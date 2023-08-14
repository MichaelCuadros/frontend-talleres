import React from 'react'
import './talleres.css';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'

export const TalleresList = ({ workshops, page, setPage }) => {
    const navegar=useNavigate();

    const HandleSiguientePagina=(e)=>{
        e.preventDefault();
        const pageNew=page+1;
        setPage(pageNew);
        //console.log("se presiono");
    }

    const HandleNavegar=(e,id)=>{
        e.preventDefault();
        navegar("/workshop/"+id,{replace:true});
    }


    return (
        <div className="contenedor">

            {workshops.map(workshop => (
                <div key={workshop._id} className="tarjeta" onClick={e=>HandleNavegar(e,workshop._id)}>
                    <h2>{workshop.name}</h2>
                    <p>Fecha de Antiguedad: <ReactTimeAgo date={workshop.create_at} locale='es-Es'/></p>
                    <p>Calificacion: {workshop.calification}</p>
                    <p>Encargado: {workshop.user.name}</p>
                </div>
            ))}

            <input type="submit" value="Mostrar más" onClick={e=>HandleSiguientePagina(e)}/>
        </div>
    )
}
