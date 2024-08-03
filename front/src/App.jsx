import React from "react";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import General from "./pages/dashboard/menus/general";
import Estadisticas from "./pages/dashboard/menus/estadisticas";
import Actividad from "./pages/dashboard/menus/actividad";
import Home from "./pages/home/home";
import CrearTablas from "./pages/dashboard/menus/creadorTablas";

function App() {
 
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/dashboard" element={<Dashboard />}>
                 <Route path="/dashboard/estadisticas" element={<Estadisticas/>}/>
                 <Route path="/dashboard/actividad" element={<Actividad/>}/>
                 <Route path="/dashboard/general" element={<General />}/>
                 <Route path="/dashboard/creador" element={<CrearTablas />}/>

                </Route>

            </Routes>
        </Router>
    )
};

export default App;