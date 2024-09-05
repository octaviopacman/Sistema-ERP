import React from "react";
import { Input, Autocomplete, AutocompleteItem, Button, Checkbox } from "@nextui-org/react";
import { mysqlDataTypes } from "../helpers/dataTypes";

function FieldGenerate({ register, count, onDelete }) {
  return (
    <div className="flex">
      <div>
        <Input
          id={`field-name-${count}`}
          label="Nombre"
          placeholder="Nombre..."
          {...register(`fields[${count}].name`)}
        />
      </div>
      <div>
        <Autocomplete
          id={`field-type-${count}`}
          defaultItems={mysqlDataTypes}
          label="Tipo de dato"
          placeholder="Integer"
          {...register(`fields[${count}].dataType`)}>
          {(datatype) => (
            <AutocompleteItem key={datatype.value}>
              {datatype.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <div>
        <Input
          type="Number"
          label="Cantidad"
          id={`field-length-${count}`}
          placeholder="Ingrese la longitud"
          {...register(`fields[${count}].length`)}
        />
      </div>
      <div className="flex gap-5 ml-4">
        <div className="flex flex-col items-center gap-2">
          <label className="h-fit">Auto Increment</label>
          <Checkbox
            className="h-fit"
            id={`field-autoincrement-${count}`}
            {...register(`fields[${count}].autoIncrement`)}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="h-fit">Primary key</label>
          <Checkbox
            className="h-fit"
            id={`field-primarykey-${count}`}
            {...register(`fields[${count}].primaryKey`)}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="h-fit">Not Null</label>
          <Checkbox
            className="h-fit"
            id={`field-notnull-${count}`}
            {...register(`fields[${count}].notNull`)}
          />
        </div>
        <div className="flex">
          <Button 
            size="sm"
            className="text-red-500"
            variant="primary"
            onClick={() => onDelete(count)} // Asegúrate de que onDelete esté definido
          >
            Eliminar Campo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FieldGenerate;
