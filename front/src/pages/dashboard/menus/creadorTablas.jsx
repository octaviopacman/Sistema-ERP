import { Button ,Input} from "@nextui-org/react"
import React from "react";


const tabla = [
    {
        campos: "campo1",
        valores: "valor1"
    },
    {
        campos: "campo2",
        valores: "valor2"
    },
    {
        campos: "campo3",
        valores: "valor3"
    },
    {
        campos: "campo4",
        valores: "valor4"
    },
    {
        campos: "campo5",
        valores: "valor5"
    }
    
] //////

export default function CrearTablas() {
    const [fieldCount, setFieldCount] = React.useState(0);
    const handleSubmit=()=>{
        console.log(fieldCount)
    }
    tabla.map((ta)=>{
        console.log(ta.valores)
    })


    return (
        <>
            <div>
                <input
                /* isClearable
                underlined */
                placeholder="nombres de campo"
                type="number"
                value={fieldCount}
                onChange={(e) => setFieldCount(e.target.value)}
                />
                <Button onClick={handleSubmit}>Generar campos</Button>
            </div>
            <div>

                <table className="bg-danger rounded">
                    <>
                                <thead>
                                    <tr>
                    {tabla.map((tab) => {
                        return(

                            <th>{tab.campos}</th> 
                        )
                                        
                                    }
                                )
                            }
                            <th><Button>Agregar Campo</Button></th>
                            </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    {tabla.map((tab) => {
                                        return(

                                            
                                            <td>{tab.valores}</td> 
                                        )
                                    })}
                                    <td><Button>Editar</Button></td>
                                    </tr>
                                </tbody>
                            </>

                </table>
            </div>
        </>
    )
}