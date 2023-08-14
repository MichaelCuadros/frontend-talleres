import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import { Global } from '../Helpers/Global';
import { TalleresList } from './TalleresList';

export const EditUser = () => {
  const [form, setForm] = useState({});
  const [text, setText] = useState("Registrate de forma gratuita y accede a los mejores talleres!");
  const navegar = useNavigate();
  const { auth, setAuth } = useAuth();
  const [workshops, setWorkshops] = useState([]);


  const changed = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value
    });
  }

  useEffect(() => {
    GetList();
  })

  const GetList = async () => {
    const request = await fetch(Global.url + "workshop/my/workshops", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });
    let data = await request.json();

    let newWorkshops = data.workshops;

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


  const HandleRegistrarUsuario = async (e) => {
    e.preventDefault();
    setText("Cargando...");
    try {
      // Recoger datos del formulario
      let newUser = form;

      // Guardar usuario en el backend
      const request = await fetch(Global.url + "user/update", {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });

      const data = await request.json();
      if (data.status === "success") {
        setText("Edición exitoso");
        navegar("/home", { replace: true });
        setAuth(data.user);
      } else {
        setText(data.message);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setText("Error en la edición");
    }

  }
  return (
    <div>
      <h1>Quieres editar tu informacion? </h1>

      <form onSubmit={e => HandleRegistrarUsuario(e)}>
        <input type='text' name='name' defaultValue={auth.name} onChange={changed} /><br />
        <input type='text' name='username' placeholder={auth.username} onChange={changed} /><br />
        <input type='password' name='password' placeholder='Contraseña' onChange={changed} /><br />
        <input type='submit' value="Editar" />
      </form>

      <h1>Mis talleres</h1>
      <TalleresList workshops={workshops} />

    </div>
  )
}
