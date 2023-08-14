import React, { useState } from 'react';
import { Global } from '../Helpers/Global';
import { useNavigate } from 'react-router-dom'

export const Register = () => {
    const [form, setForm] = useState({});
    const [text, setText] = useState("Registrate de forma gratuita y accede a los mejores talleres!");
    const navegar=useNavigate();


    const changed = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const HandleRegistrarUsuario = async (e) => {
        e.preventDefault();
        if (form.name && form.username && form.password) {
            setText("Cargando...");
            
            try {
                // Recoger datos del formulario
                let newUser = form;

                // Guardar usuario en el backend
                const request = await fetch(Global.url+"user/register", {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: {
                        "Content-type": "application/json"
                    }
                });

                const data = await request.json();
                if (data.status === "success") {
                    setText("Registro exitoso");
                    // Puedes resetear el formulario si lo deseas
                    setForm({});
                    navegar("/login",{replace:true});
                } else {
                    setText(data.message);
                }
            } catch (error) {
                console.error("Error al enviar la solicitud:", error);
                setText("Error en el registro");
            }
        } else {
            setText("Faltan datos necesarios");
        }
    }

    return (
        <div>
            <h1>Regístrate</h1>
            <h2>{text}</h2>
            <form onSubmit={e => HandleRegistrarUsuario(e)}>
                <input type='text' name='name' placeholder='Nombre' onChange={changed} /><br />
                <input type='text' name='username' placeholder='Nombre de usuario' onChange={changed} /><br />
                <input type='password' name='password' placeholder='Contraseña' onChange={changed} /><br />
                <input type='submit' value="Registrarse" />
            </form>
        </div>
    );
}