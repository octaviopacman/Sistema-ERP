import {
  Input,
  Autocomplete,
  Checkbox,
  AutocompleteItem,
} from "@nextui-org/react";

import {mysqlDataTypes} from "../helpers/dataTypes";

function FieldGenerate({register, count}) {
  count += 1;

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
          {...register(`${count}dataType`)}>
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
          id={count}
          placeholder="Ingrese la longitud"
          {...register(`${count}length`)}
        />
      </div>
      <div className="flex gap-5 ml-4">
        <div className="flex flex-col items-center gap-2">
          <label className="h-fit"> Auto Increment</label>
          <Checkbox
            className="h-fit"
            id={count}
            {...register(`${count}AutoIncrement`)}></Checkbox>
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="h-fit"> Primary key</label>
          <Checkbox
            className="h-fit"
            id={count}
            {...register(`${count}PrimaryKey`)}></Checkbox>
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="h-fit"> Not Null</label>
          <Checkbox
            className="h-fit"
            id={count}
            {...register(`${count}NotNull`)}></Checkbox>
        </div>
      </div>
    </div>
  );
}

export default FieldGenerate;
