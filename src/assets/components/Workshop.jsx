import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Global } from '../Helpers/Global';
import './Workshop.css';
import ReactTimeAgo from 'react-time-ago'

export const Workshop = () => {
    const params = useParams();
    const [workshop, setWorkshop] = useState({});
    const [calification, setCalification] = useState(0);
    const [comentarios, setComentarios] = useState([]);

    console.log(params.id);
    useEffect(() => {
        get_workshop();
        get_calification();
        get_comments();
    }, [])

    const get_workshop = async () => {
        const request = await fetch(Global.url + "workshop/" + params.id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        });
        let data = await request.json();
        setWorkshop(data.workshop);
    }

    const get_comments = async () => {
        const request = await fetch(Global.url + "comment/workshop/" + params.id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        });
        let data = await request.json();
        setComentarios(data.comments);
    }

    const get_calification = async () => {
        const request = await fetch(Global.url + "comment/workshop/calification/" + params.id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        });
        const data = await request.json();
        setCalification(data.calification);
    }

    return (
        <>
            <div className="taller-profile">
                <img src="https://assets.volkswagen.com/is/image/volkswagenag/diferencias-carros-sedan-hatchback-suv?Zml0PWNyb3AlMkMxJndpZD0xMjgwJmhlaT03MjAmZm10PWpwZWcmcWx0PTc5JmJmYz1vZmYmMmI5ZQ==" alt="Taller Image" className="profile-image" />
                <h1 className="profile-name">{workshop.name}</h1>
                <p className="profile-description">{workshop.description}</p>
                <p className="profile-description">Estrellas: {calification}</p>
                <h2 className="section-title">Comentarios de Clientes</h2>
                <div className="comments">
                    {comentarios.map(comment => (
                        <div className="comment">
                          {/**   <img src="user-avatar1.jpg" alt="User Avatar" className="comment-avatar" />*/}
                            <p className="comment-text">Comentario: {comment.text}</p>
                            <p className='comment-author'>Calificacion: {comment.calification}</p>
                            <p className="comment-author"> <ReactTimeAgo date={comment.create_at} locale='es-Es'/></p>
                        </div>
                    ))}

                </div>
            </div>

        </>
    )
}
