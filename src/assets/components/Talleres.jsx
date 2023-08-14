import React, { useEffect, useState } from 'react';
import './talleres.css';
import { Global } from '../Helpers/Global';
import { TalleresList } from './TalleresList';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export const Talleres = () => {
    const { auth } = useAuth();
    const [workshops, setWorkshops] = useState([]);
    const [page, setPage] = useState(1);

    const GetList = async () => {
        const request = await fetch(Global.url + "workshop/list/" + page, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        let data = await request.json();


        let newWorkshops = data.workshops;
        if (workshops.length >= 1) {
            console.log("Ga");
            newWorkshops = [...workshops, ...data.workshops]
            console.log(newWorkshops);
        }

        // Llamada a CalcularCalificacion para cada taller
        const workshopsWithCalifications = await Promise.all(newWorkshops.map(async (workshop) => {
            const calification = await CalcularCalificacion(workshop._id);
            return { ...workshop, calification };
        }));

        setWorkshops(workshopsWithCalifications);

    };

    const CalcularCalificacion = async (id) => {
        const request = await fetch(Global.url + "comment/workshop/calification/" + id, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        });
        const data = await request.json();
        return data.calification;
    };

    useEffect(() => {
        GetList();
        console.log(workshops);
    }, [page]);

    const HandleBuscarTalleres = async (e) => {
        const request = await fetch(Global.url + "workshop/intelligentfind/" + e.target.value + "/1", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        });
        const data = await request.json();
        console.log(data);
        setWorkshops(data.workshops);

    }

    return (
        <>
            <input type='text' placeholder='Buscar' onChange={e => HandleBuscarTalleres(e)} />
            {auth._id ?
                <Link to="/newworkshop">Quieres un nuevo taller?</Link>
                : ""
            }
            <TalleresList workshops={workshops} page={page} setPage={setPage} />
        </>
    );
};