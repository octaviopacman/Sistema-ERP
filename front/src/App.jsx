import React from "react";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardRoutes from "./animations";
import { motion } from "framer-motion";
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

const pageTransition = {
    in: { opacity: 1, x: 0 },
    out: { opacity: 1, x: "-100vw" }
};

const transition = {
    duration: 0.3,
}



function App() {


    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/dashboard" element={<Dashboard />}>
            <Route
                path="/dashboard/estadisticas"
                element={
                    <motion.div
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageTransition}
                        transition={transition}
                    >
                        <Estadisticas />
                    </motion.div>
                }
            />
            <Route
                path="/dashboard/actividad"
                element={
                    <motion.div
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageTransition}
                        transition={transition}

                    >
                        <Actividad />
                    </motion.div>
                }
            />
            <Route
                path="/dashboard/general"
                element={
                    <motion.div
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageTransition}
                        transition={transition}

                    >
                        <General />
                    </motion.div>
                }
            />
            <Route
                path="/dashboard/creador"
                element={
                    <motion.div
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageTransition}
                        transition={transition}

                    >
                        <CrearTablas />
                    </motion.div>
                }
            />
        </Route>

            </Routes>
        </Router>
    )
};

export default App;