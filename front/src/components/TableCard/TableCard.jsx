import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import { getValuesTables } from "../../queryFn/queryFn";

function TableCard({ tablaSeleccionada }) {
  const [data, setData] = useState([]);
  const [dataParsed, setDataParsed] = useState([]);

  useEffect(() => {
    if (tablaSeleccionada) {
      const getTableValues = async () => {
        const res = await getValuesTables(tablaSeleccionada.nombre_tabla);
        setData(res);
      };
      getTableValues();
    }
  }, [tablaSeleccionada]);

  useEffect(() => {
    if (data.length > 0) {
      setDataParsed([]);
      data.map((fila) => {
        for (let prop in fila) {
          setDataParsed((prevDataParsed) => [
            ...prevDataParsed,
            <td key={fila[prop]} className="border-2 border-zinc-950">
              {fila[prop]}
            </td>,
          ]);
        }
      });
    }
  }, [data]);

  return (
    <>
      {tablaSeleccionada && (
        <div className="tabla ">
          <div className="w-full bg-dark flex justify-between items-center content-center flex-row ">

            <h2 className="bg-[#18181b] text-center text-white mt-5 rounded h-full">
              {tablaSeleccionada.nombre_tabla}
            </h2>

            <Button color="danger">
              Borrar Tabla
            </Button>

          </div>
          <table
            aria-label="Example table with dynamic content"
            className="border-2 border-zinc-950">
            <tr>
              {tablaSeleccionada.campos.map((column, i) => {
                if (!column.foreignkey) {
                  return (
                    <th
                      className="border-2 rounded border-zinc-950"
                      key={column.name}>
                      {column.name}
                      {i === tablaSeleccionada.campos.length - 1 && (
                        <div></div>

                      )

                      }
                    </th>
                  );
                } else {
                  return (
                    <th
                      className="border-2 rounded border-zinc-950"
                      key={column.nameForeign}>
                      {column.nameForeign} (Fk de {column.tableForeign})
                    </th>
                  );
                }
              })}
            </tr>
            {data && data.map((fila) => <tr key={fila}>{dataParsed}</tr>)}
          </table>
        </div>
      )}
    </>
  );
}

export default TableCard;
