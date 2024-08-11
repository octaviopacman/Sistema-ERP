import { Button, Input } from "@nextui-org/react"
import React from "react";
import FieldGenerate from "../../../components/FieldGenerate";
import { useForm } from "react-hook-form";
/* const tablaCol = {
    column_name: "id",
    data_type: "integer",
    is_primary_key: true,
    is_auto_increment: true
} */

export default function CrearTablas() {
    const { handleSubmit, register }= useForm()
    const [idField, setIdField]=React.useState(null);
    const [isDeleting, setIsDeleting]= React.useState(false)
    
    const [campos, useCampos] = React.useState([<FieldGenerate key={0} register={register} count={0}/>])
    
    const handleClickerSubmit = () => {
        const camposNuevos = [...campos];
        const longitudNueva = campos.length;
        camposNuevos.push(<FieldGenerate key={longitudNueva} register={register} count={longitudNueva} />);
        useCampos(camposNuevos)
        setIsDeleting(false)
    }
    const handlerSubmitEliminar = (e) => {
        console.log(campos[0].key);
        const id=e.target.id;
        const camposNuevos = campos.filter((campo) => id !== Number(campo.key))
        console.log(camposNuevos)
        setIdField(parseInt(e.target.id) + 1)
        setIsDeleting(true)
        e.target.parentElement.remove();
        console.log(campos)
    }
    const submit = handleSubmit((data)=>{
        if(isDeleting){
            for( const prop in data ){
                if(parseInt(prop[0]) === idField){
                    delete data[prop]
                }
            }
            return console.log(data)
        }
        for( const prop in data ){
                if(parseInt(prop[0]) === idField){
                    delete data[prop]
                }
            }
        console.log(data)
        /* 
        createTable(data) */
    })
    return (
        <>
            
            <div className="p-5">
                <form onSubmit={submit}>
                    <Input
                        label="Título de Tabla"
                        placeholder="Título..."
                        name="titleTable"
                     {...register(`title`, { required: true })}

                    />
                    <div className="p-3">
                    {
                        campos.map((campos, i) =>{
                            return( 
                                <div key={i}>
                                    <div>
                                    {campos}
                                    <Button size="sm"  className="text-red-500" variant="primary" onClick={handlerSubmitEliminar} id={i}>Eliminar</Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="text-center">
                        
                    <Button type="submit">Crear Tabla</Button>
                    <Button onClick={handleClickerSubmit}>Agregar Campo</Button>
                    </div>

                </form>


                
            </div>
        </>
    )
}