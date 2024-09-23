import React from "react";
import { motion } from "framer-motion";
import { Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import General from "./pages/dashboard/menus/general";
import Estadisticas from "./pages/dashboard/menus/estadisticas";
import Actividad from "./pages/dashboard/menus/actividad";
import CrearTablas from "./pages/dashboard/menus/creadorTablas";

const pageTransition = {
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "-100vw" }
};

function DashboardRoutes() {
    return (
        <Route path="/dashboard" element={<Dashboard />}>
            <Route
                path="/dashboard/estadisticas"
                element={
                    <motion.div
                        initial="out"
                        animate="in"
                        exit="out"
                        variants={pageTransition}
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
                    >
                        <CrearTablas />
                    </motion.div>
                }
            />
        </Route>
    );
}

export default DashboardRoutes;
