import React, { useState } from "react";
import { Input, Autocomplete, AutocompleteItem, Button, Checkbox } from "@nextui-org/react";
import { mysqlDataTypes } from "../helpers/dataTypes";

// Componente FieldGenerate
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
            onClick={() => onDelete(count)} // Asegúrate de que onDelete está pasando correctamente
          >
            Eliminar Campo
          </Button>
        </div>
      </div>
    </div>
  );
}

// Componente DynamicFieldForm
function DynamicFieldForm({ register, onDelete }) {
  const [fieldCount, setFieldCount] = useState(1);

  const handleFieldCountChange = (e) => {
    const value = e.target.value;
    if (value === '' || parseInt(value) >= 0) {
      setFieldCount(value);
    }
  };

  const handleFieldCountBlur = () => {
    if (fieldCount === '' || parseInt(fieldCount) < 1) {
      setFieldCount(1);
    } else {
      setFieldCount(parseInt(fieldCount));
    }
  };

  const fieldsArray = [...Array(fieldCount).keys()];

  return (
    <div>
      <Input
        type="number"
        label="Número de campos"
        min={1}
        value={fieldCount}
        onChange={handleFieldCountChange}
        onBlur={handleFieldCountBlur}
        placeholder="¿Cuántos campos quieres crear?"
      />
      <div>
        {fieldsArray.map((index) => (
          <FieldGenerate 
            key={index} 
            register={register} 
            count={index} 
            onDelete={onDelete} // Asegúrate de pasar la función onDelete aquí
          />
        ))}
      </div>
      <Button type="submit">Submit</Button>
    </div>
  );
}

export default DynamicFieldForm;
