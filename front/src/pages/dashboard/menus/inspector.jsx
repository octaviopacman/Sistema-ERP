import './inspector.css';
import { Button } from "@nextui-org/react";

export default function Inspector() {
    return (
        <div>
            <h1>Inspector</h1>
            {/* Aquí se mostrarán los datos del inspector */}
            <div className='tabla'>
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
                                    <Button color="warning">
                                        Editar
                                    </Button>
                                    <Button color="danger">
                                        Borrar
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

        </div>
    );
}