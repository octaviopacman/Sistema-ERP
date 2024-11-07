import {Divider} from "@nextui-org/react";
import {Link} from "react-router-dom";

export default function Sidebar({tables, params}) {
  console.log(tables);
  return (
    <section className="h-screen  w-64 bg-[#18181b] rounded-r-lg pt-7 left-0 top-0 ">
      <h2 className="bg-[#18181b]  text-white text-center">Tablas para ver</h2>
      <Divider className="my-4 bg-white" />
      <nav>
        <ul>
          {tables &&
            tables.map((tabla) => {
              if (params.tablaId == tabla.tabla_id) {
                return (
                  <>
                    <li className="flex w-full bg-[#2c2c2f]  h-10 justify-start items-center p-7 text-white hover:bg-neutral-600 font-medium		">
                      <p>{tabla.nombre_tabla}</p>
                    </li>
                  </>
                );
              } else {
                return (
                  <Link
                    to={`/dashboard/inspector/${tabla.tabla_id}`}
                    key={tabla.tabla_id}>
                    <li className="flex w-full bg-[#18181b]  h-10 justify-start items-center p-7 text-white hover:bg-neutral-700 font-medium		">
                      <p>{tabla.nombre_tabla}</p>
                    </li>
                  </Link>
                );
              }
            })}
        </ul>
      </nav>
    </section>
  );
}
