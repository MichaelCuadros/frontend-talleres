import React, { useState } from 'react'
import { Global } from '../Helpers/Global';

export const NewTaller = () => {
    const [form, setForm] = useState({});


    const handleChanged = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleRegistrar=async(e)=>{
        e.preventDefault();
        if(form.name&&form.description){
            const request = await fetch(Global.url+"workshop/register", {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                    "Content-type": "application/json",
                    "Authorization":localStorage.getItem("token")
                }
            });
            const data=await request.json();
            console.log(data);
        }
    }

    return (
        <div>
            <form onSubmit={e=>handleRegistrar(e)}>
            <input type='text' name='name' placeholder='Titulo' onChange={handleChanged} /><br />
            <input type='text' name='description' placeholder='Description' onChange={handleChanged} /><br />
            <input type='submit' value="Registrar" />
            </form>
        </div>
    )
}
