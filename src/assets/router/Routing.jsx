import React, { useEffect } from 'react'
import { Routes, Route, BrowserRouter, NavLink } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Register } from '../components/Register';
import { Login } from '../components/Login';
import { AuthProvider } from '../context/AuthProvider';
import { Inicio } from '../components/Inicio';
import { EditUser } from '../components/EditUser';
import { Talleres } from '../components/Talleres';
import { NewTaller } from '../components/NewTaller';
import { Workshop } from '../components/Workshop';


export const Routing = () => {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Nav />}>
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/home' element={<Inicio/>}/>
                        <Route path='/edit' element={<EditUser/>}/>
                        <Route path='/workshops' element={<Talleres/>}/>
                        <Route path='/newworkshop' element={<NewTaller/>}/>
                        <Route path='/workshop/:id' element={<Workshop/>}/>
                        <Route path='*' element={<h1>Pagina no encontrada 404</h1>}/>

                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
