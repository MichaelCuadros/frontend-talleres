import { NavLink } from 'react-router-dom';
import './inicio.css'; // Enlaza tus estilos CSS aquí
import React from 'react'

export const Inicio = () => {
    return (
        <>
         

                <section className="hero">
                    <div className="hero-content">
                        <NavLink to="/workshops" className="btn">Ver Talleres</NavLink>
                    </div>
                </section>

                <section className="features">
                    <div className="feature">
                        <h3>Talleres Interactivos</h3>
                        <p>Aprende de manera práctica y participativa con nuestros talleres interactivos.</p>
                    </div>
                    <div className="feature">
                        <h3>Expertos en el Campo</h3>
                        <p>Nuestros instructores son expertos en sus áreas y te guiarán en tu aprendizaje.</p>
                    </div>
                    <div className="feature">
                        <h3>Flexibilidad Horaria</h3>
                        <p>Elige entre una variedad de horarios para ajustarte a tu rutina diaria.</p>
                    </div>
                </section>

            
        </>
    )
}
