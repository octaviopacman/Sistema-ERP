//paginas
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import General from "./pages/dashboard/menus/general";
import Actividad from "./pages/dashboard/menus/actividad";
import Home from "./pages/home/home";
import CrearTablas from "./pages/dashboard/menus/creadorTablas";
import Estadisticas from "./pages/dashboard/menus/estadisticas";
import Inspector from "./pages/dashboard/menus/inspector";
import {TabProvider} from "./components/tabContext";

//contextos
import {AuthProvider} from "./context/AuthContext";

//funcionalidades y estilos
import DashboardRoutes from "./animations";
import {motion} from "framer-motion";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

const pageTransition = {
  in: {opacity: 1, x: 0},
  out: {opacity: 1, x: "-100vw"},
};

const transition = {
  duration: 0.3,
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route
              path="/dashboard/estadisticas"
              element={
                <motion.div
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                  transition={transition}>
                  <Estadisticas />
                </motion.div>
              }
            />

            <Route
              path="/dashboard/"
              element={
                <motion.div
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                  transition={transition}>
                  <Estadisticas />
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
                  transition={transition}>
                  <CrearTablas />
                </motion.div>
              }
            />
            <Route
              path="/dashboard/inspector"
              element={
                <motion.div
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                  transition={transition}>
                  <Inspector />
                </motion.div>
              }
            />
            <Route
              path="/dashboard/inspector/:tablaId"
              element={
                <motion.div
                  initial="out"
                  animate="in"
                  exit="out"
                  variants={pageTransition}
                  transition={transition}>
                  <Inspector />
                </motion.div>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
