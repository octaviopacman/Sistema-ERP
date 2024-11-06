import React, {createContext, useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
const TabContext = createContext();

export const TabProvider = ({children}) => {
  const navigate = useNavigate();
  // Obtener pestañas desde el almacenamiento local o usar el estado inicial por defecto
  const initialTabs = JSON.parse(localStorage.getItem("tabs")) || [
    {name: "Dashboard", path: "/dashboard", visible: true},
    {name: "Creador", path: "/dashboard/creador", visible: false},
    {name: "Inspector", path: "/dashboard/inspector", visible: true},
  ];

  // Estado para manejar las pestañas visibles
  const [tabs, setTabs] = useState(initialTabs);

  // Guardar el estado de las pestañas en el almacenamiento local cada vez que cambie
  useEffect(() => {
    if (tabs !== undefined) {
      localStorage.setItem("tabs", JSON.stringify(tabs));
    } else {
      console.error("No hay pestañas");
    }
  }, [tabs]);

  // Método para agregar una pestaña
  const addTab = (name, path) => {
    setTabs((prevTabs) => [...prevTabs, {name, path, visible: true}]);
  };

  // Método para borrar una pestaña por su nombre
  const removeTab = (name) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.name !== name));
  };

  // Método para ocultar una pestaña
  const hideTab = (name, i) => {
    setTabs((prevTabs) => {
      let pestañaSecundaria = prevTabs[i - 1]
        ? prevTabs[i - 1]
        : prevTabs[i + 1];

      if (!pestañaSecundaria.visible) {
        pestañaSecundaria = prevTabs[i - 2] ? prevTabs[i - 2] : prevTabs[i + 2];
      }
      return prevTabs.map((tab) => {
        if (tab.name === name) {
          if (pestañaSecundaria) {
            if (pestañaSecundaria.visible === false) {
              navigate("/dashboard");
              prevTabs[0].visible = true;
            } else {
              navigate(pestañaSecundaria.path);
            }
          } else {
            navigate("/dashboard");
            prevTabs[0].visible = true;
          }
          return {...tab, visible: false};
        } else {
          return tab;
        }
      });
    });
  };

  // Método para mostrar una pestaña
  const showTab = (name) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.name === name ? {...tab, visible: true} : tab))
    );
  };

  return (
    <TabContext.Provider value={{tabs, addTab, removeTab, hideTab, showTab}}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  return useContext(TabContext);
};
