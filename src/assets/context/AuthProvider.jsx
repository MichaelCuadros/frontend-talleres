import React, { createContext, useEffect, useState } from 'react'
import { Global } from '../Helpers/Global';

const AuthContext=createContext();

export const AuthProvider = ({children}) => {
    const [auth,setAuth]=useState({});

    useEffect(()=>{
      authUser();
    },[]);

    const authUser=async()=>{
        //sacar  datos del usuario identificado del localstorage
        const token=localStorage.getItem("token");
        const user=localStorage.getItem("user");

        //comprobar si tengo el token y el user
      if(!token||!user){
        return false;//se termina de ejecutar la aplicacion
      }

        //transformar los datos a un objeto de javascript
        const userObj=JSON.parse(user);
        const userId=userObj.id;


        //peticion ajax al backend que compruebe el token
        //y que me devuelva todos los datos del usuario
        const request=await fetch(Global.url+"user/find/"+userId,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":token
          }
        });

        const data=await request.json();

        //console.log(data.user);
        
        //setear el estado de auth
        setAuth(data.user);

    };

  return (
    <AuthContext.Provider value={{auth,setAuth}}    > {/**en value ponemos lo que queremos compartir */}
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;