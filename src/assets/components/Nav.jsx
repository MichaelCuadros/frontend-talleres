import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'

export const Nav = () => {
    const { auth, setAuth } = useAuth();
    const navegar = useNavigate();

    useEffect(() => {
        if (localStorage.hasOwnProperty("user")) {
            navegar("/home", { replace: true });//veremos a donde lo llevaremos
        }
    }, [])

    return (
        <div className="App">
            <header className="header">
                <h1>Página de Talleres</h1>
            </header>
            <nav className="nav">
                <NavLink to="/home" className="nav-link">Inicio</NavLink>
                <NavLink to="/workshops" className="nav-link">Talleres</NavLink>
                <NavLink to="/login" className="nav-link">Mi Cuenta</NavLink>
            </nav>
            <div className="container">
                <h2>Explora Nuestros Talleres</h2>
                <p>Encuentra talleres interesantes para participar y aprender nuevas habilidades.</p>
                {/* Agrega componentes de React para la lista de talleres, comentarios y calificaciones */}
                <Outlet />
            </div>
        </div>
    )
}
