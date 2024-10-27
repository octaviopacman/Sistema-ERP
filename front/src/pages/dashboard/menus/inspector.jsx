import {useEffect, useState} from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./inspector.css";
import {Button} from "@nextui-org/react";
import {tablesByUser} from "../../../queryFn/queryFn";

export default function Inspector() {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    const getTables = async () => {
      const res = await tablesByUser(1, "Owner");
      if (res) {
        setTables(res);
      }
    };
    getTables();
  }, []);
  console.log(tables);
  return (
    <div className="flex row gap-20">
      <Sidebar tables={tables} />
      {/* Aquí se mostrarán los datos del inspector */}
      <div className="tabla">
        <h2>Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juan</td>
              <td>Perez</td>
              <td>123456789</td>
              <td>juan@example.com</td>
              <td>1234567890</td>
              <td>
                <div className="flex flex-wrap gap-4 items-center m-auto">
                  <Button color="warning">Editar</Button>
                  <Button color="danger">Borrar</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
