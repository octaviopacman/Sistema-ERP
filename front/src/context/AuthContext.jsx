import {createContext, useContext, useEffect, useState} from "react";
import {iniciarSesion, registerUser, verifyCookies} from "../queryFn/queryFn";
import Cookie from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Debe usar este hook dentro de un componente AuthProvider");
  }
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [registroError, setRegistroError] = useState([]);
  const [loginError, setLoginError] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  const registrarUsuario = async (data) => {
    try {
      const peticion = await registerUser(data);
      if (peticion.length > 0) {
        return setRegistroError(peticion);
      }
      setUser(peticion);
      setIsRegistered(true);
      setRegistroError([]);
    } catch (error) {
      console.log(error);
    }
  };
  const loginUsuario = async (data) => {
    try {
      const peticion = await iniciarSesion(data);
      if (peticion.length > 0) {
        return setLoginError(peticion);
      }
      setIsAuthenticated(true);
      setUser(peticion);
      Cookie.set("token", peticion.token);
    } catch (error) {
      console.log(error);
    }
  };
  const cerrarSesion = () => {
    setUser(null);
    Cookie.remove("token");
    setIsAuthenticated(false);
    setIsRegistered(false);
  };

  useEffect(() => {
    if (registroError.length > 0) {
      const timer = setTimeout(() => {
        setRegistroError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  });
  useEffect(() => {
    if (loginError.length > 0) {
      const timer = setTimeout(() => {
        setLoginError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  });
  useEffect(() => {
    async function verificarCookies() {
      const token = Cookie.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
      const data = await verifyCookies();
      if (!data) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(data);
      setIsAuthenticated(true);
      setLoading(false);
    }
    verificarCookies();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registrarUsuario,
        loginUsuario,
        cerrarSesion,
        user,
        isAuthenticated,
        isRegistered,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
