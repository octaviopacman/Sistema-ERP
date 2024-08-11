import {
    Button,
    Input,
    Autocomplete,
    AutocompleteSection,
    AutocompleteItem
} from "@nextui-org/react"

import { mysqlDataTypes } from "../helpers/dataTypes"


function FieldGenerate({register, count}) {
    count+=1
    
    return (
        <div className="flex">
            <div>
                <Input
                id={count}
                    label="Nombre"
                    placeholder="Nombre..."
                    {...register(`${count}name`)}
                    
                    />
            </div>
            <div>
                <Autocomplete
                id={count}

                    defaultItems={mysqlDataTypes}
                    label="Tipo de dato"
                    placeholder="Integer"
                    {...register(`${count}dataType`)}

                    >
                    {(datatype) => <AutocompleteItem key={datatype.value}>{datatype.label}</AutocompleteItem>}

                </Autocomplete>
            </div>
            <div>
                <Input type="Number" label="Cantidad"
                id={count}

                    placeholder="Ingrese la longitud" 
                    {...register(`${count}length`)}
                    />
            </div>
            <div>
                <Autocomplete
                id={count}

                    label="Auto Incremento"
                    placeholder="SI/NO"
                    {...register(`${count}autoInc`)}
                >
                    <AutocompleteItem>SI</AutocompleteItem>
                    <AutocompleteItem>NO</AutocompleteItem>
                </Autocomplete>
            </div>

        </div>
    )
}

export default FieldGenerate