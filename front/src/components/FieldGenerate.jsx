import React, { useState } from "react";
import {
  Input,
  Autocomplete,
  Checkbox,
  AutocompleteItem,
  Button,
} from "@nextui-org/react";
import { mysqlDataTypes } from "../helpers/dataTypes";

function FieldGenerate({ register, count }) {
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

      </div>
    </div>
  );
}

function DynamicFieldForm({ register }) {
  const [fieldCount, setFieldCount] = useState(1);

  const handleFieldCountChange = (e) => {
   const value = e.target.value;
   if (value === '' || parseInt(value) >= 0) {
    setFieldCount(value)
  }
  console.log(value)
  };

  const handleFieldCountBlur = () => {
    if (fieldCount === '' || parseInt(fieldCount) < 1) {
      setFieldCount(1);

    } else {
      setFieldCount(parseInt(fieldCount))
    }
  }

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
          <FieldGenerate key={index} register={register} count={index} />
        ))}
      </div>
      <Button type="submit">Submit</Button>
    </div>
  );
}

export default DynamicFieldForm;
