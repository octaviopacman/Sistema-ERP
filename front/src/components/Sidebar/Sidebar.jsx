import {Link} from "react-router-dom";

export default function Sidebar({tables}) {
  return (
    <section className="h-screen  w-64 bg-neutral-800 rounded-r-lg pt-7 left-0 top-0 ">
      <h2 className="bg-neutral-800">Tablas para ver</h2>
      <nav>
        <ul>
          {tables &&
            tables.map((tabla) => (
              <Link to="/" key={tabla.tabla_id}>
                <li className="flex w-full bg-neutral-800 h-10 justify-start items-center p-7 text-white hover:bg-neutral-700 font-medium		">
                  <p>{tabla.nombre_tabla}</p>
                </li>
              </Link>
            ))}
        </ul>
      </nav>
    </section>
  );
}
