import {useEffect, useState} from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./inspector.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {tablesByUser} from "../../../queryFn/queryFn";
import {useParams} from "react-router-dom";
import TableCard from "../../../components/TableCard/TableCard";

export default function Inspector() {
  const [tables, setTables] = useState([]);
  const [tablaSeleccionada, setTablaSeleccionada] = useState(null);

  const params = useParams();

  useEffect(() => {
    const getTables = async () => {
      const res = await tablesByUser(1, "Owner");
      if (res) {
        setTables(res);
      }
    };
    getTables();
  }, []);
  useEffect(() => {
    if (params.tablaId) {
      const tabla = tables.find((t) => t.tabla_id === Number(params.tablaId));
      setTablaSeleccionada(tabla);
      console.log(tabla);
    }
  }, [params, tables]);

  return (
    <div className="flex row w-full h-screen gap-10">
      <Sidebar tables={tables} params={params} />
      {/* Aquí se mostrarán los datos del inspector */}
      <div className="w-screen flex justify-center mt-40">
        {!params.tablaId && (
          <h2>Puede ingresar a una tabla desde la barra lateral</h2>
        )}
        {params.tablaId && tablaSeleccionada && (
          <TableCard tablaSeleccionada={tablaSeleccionada} />
        )}
      </div>
    </div>
  );
}
