import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Global } from '../Helpers/Global';
import useAuth from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { EditUser } from './EditUser';
export const Login = () => {
    const [form, setForm] = useState({});
    const [text, setText] = useState("");
    const { auth, setAuth } = useAuth();
    const navegar = useNavigate();

    const changed = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    // Ingresar
    const HandleSubmitForm = async (e) => {
        e.preventDefault();
        if (form.username && form.password) {
            let newUser = form;
            const request = await fetch(Global.url + "user/login", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const data = await request.json();
            setText(data.message);
            if (data.status === "success") {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setAuth(data.user);
                navegar("/home");
            }
        }
    }


    useLayoutEffect(() => {
        if (localStorage.hasOwnProperty("user")) {
            console.log(auth);
        }
    }, [auth]); // Se ejecutará cuando el valor de "auth" cambie

    const HandleCerrarSesion = () => {
        localStorage.clear();
        setAuth({});
    }

    return (
        <div>
            {localStorage.hasOwnProperty("user") ? (
                <>
                    <NavLink onClick={HandleCerrarSesion}>
                        Cerrar sesion
                    </NavLink>
                    <EditUser />


                </>

            ) :
                (
                    <>
                        <h2>{text}</h2>
                        <form onSubmit={e => HandleSubmitForm(e)}>
                            <input type='text' name='username' placeholder='Nombre de usuario' onChange={changed} /><br />
                            <input type='password' name='password' placeholder='Contrasenia' onChange={changed} /><br />
                            <input type='submit' value="Entrar" />
                        </form>
                        <br />
                        <NavLink to="/register">Registrate Ahora!</NavLink>

                    </>
                )
            }
        </div>
    )
}