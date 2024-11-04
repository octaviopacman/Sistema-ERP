/* import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"; */

import {useEffect, useState} from "react";
import {getValuesTables} from "../../queryFn/queryFn";

function TableCard({tablaSeleccionada}) {
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
    console.log(data);
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
      console.log(dataParsed);
    }
  }, [data]);

  return (
    <>
      {tablaSeleccionada && (
        <div className="tabla ">
          <h2 className="bg-[#18181b] text-center text-white mt-5 rounded">
            {tablaSeleccionada.nombre_tabla}
          </h2>
          <table
            aria-label="Example table with dynamic content"
            className="border-2 border-zinc-950">
            <tr>
              {tablaSeleccionada.campos.map((column) => {
                if (!column.foreignkey) {
                  return (
                    <th
                      className="border-2 rounded border-zinc-950"
                      key={column.name}>
                      {column.name}
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
