import {useEffect, useState} from "react";
import {
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {mysqlDataTypes} from "../helpers/dataTypes";

function FieldGenerate({
  register,
  count,
  onDelete,
  avaibleTablas,
  tables,
  setValue,
  getValues,
}) {
  const [foreign, setForeign] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedForeignTable, setSelectedForeignTable] = useState(null);
  const [load, setLoad] = useState(true);
  const [foreignLoad, setForeignLoad] = useState(true);

  const TablaSeleccionada = (e) => {
    const tabla = tables.find((tabla) => tabla.nombre_tabla === e.target.value);
    setSelectedTable(e.target.value);
    const campoPrimario = tabla.campos.find((c) => c.primaryKey === true);
    setSelectedForeignTable(campoPrimario);
    setLoad(false);
  };

  useEffect(() => {
    if (selectedForeignTable) {
      setValue(
        `fields[${count}].foreignKeyType`,
        selectedForeignTable.dataType
      );
      setValue(`fields[${count}].name`, "");
      setValue(`fields[${count}].primaryKey`, false);
      setValue(`fields[${count}].notNull`, false);
      setValue(`fields[${count}].length`, "");
      setValue(`fields[${count}].dataType`, "");
      setValue(`fields[${count}].autoIncrement`, false);
      setValue(`fields[${count}].nameForeign`, selectedForeignTable.name);
    }
    if ((!selectedForeignTable && !load) || (!foreign && !foreignLoad)) {
      setValue(`fields[${count}].foreignkey`, false);
      setValue(`fields[${count}].tableForeign`, "");
      setValue(`fields[${count}].nameForeign`, "");
      setValue(`fields[${count}].foreignKeyType`, "");
      setValue(`fields[${count}].name`, "");
      setValue(`fields[${count}].primaryKey`, false);
      setValue(`fields[${count}].notNull`, false);
      setValue(`fields[${count}].length`, "");
      setValue(`fields[${count}].dataType`, "");
      setValue(`fields[${count}].autoIncrement`, false);
    }
  }, [selectedForeignTable]);

  useEffect(() => {
    if (foreign && !selectedForeignTable) {
      setValue(`fields[${count}].foreignkey`, false);
      setValue(`fields[${count}].tableForeign`, "");
      setValue(`fields[${count}].nameForeign`, "");
      setValue(`fields[${count}].foreignKeyType`, "");
      setValue(`fields[${count}].name`, "");
      setValue(`fields[${count}].primaryKey`, false);
      setValue(`fields[${count}].notNull`, false);
      setValue(`fields[${count}].length`, "");
      setValue(`fields[${count}].dataType`, "");
      setValue(`fields[${count}].autoIncrement`, false);
    }
  }, [foreign]);
  return (
    <div className="flex wrap gap-4 mb-4">
      <div className="flex  col items-center gap-2">
        <label className="h-fit">Foreign key</label>
        <Checkbox
          className="h-fit"
          id={`field-foreignkey-${count}`}
          {...register(`fields[${count}].foreignkey`, {
            value: foreign,
          })}
          onChange={(e) => {
            setForeign(e.target.checked);
            setForeignLoad(!foreignLoad);
          }}
        />
      </div>
      {foreign && tables.length === 0 && (
        <p className="text-red">No hay tablas disponibles para relacionar</p>
      )}
      {foreign && tables.length > 0 && (
        <div className="w-screen flex row gap-4">
          <div className="w-full">
            <Select
              id={`field-foreign-table-${count}`}
              label="Relacionar tablas"
              placeholder="Selecciona Una Tabla"
              {...register(`fields[${count}].tableForeign`, {
                onChange: (e) => {
                  TablaSeleccionada(e);
                },
                value: selectedTable,
              })}>
              {tables &&
                tables.map((table) => (
                  <SelectItem
                    key={table.nombre_tabla}
                    value={table.nombre_tabla}>
                    {table.nombre_tabla}
                  </SelectItem>
                ))}
              {}
            </Select>
          </div>
          {selectedTable && selectedForeignTable && (
            <>
              <Input
                id={`field-name-${count}`}
                placeholder="Type"
                label="Campo de la tabla"
                disabled
                value={selectedForeignTable.name}
                {...register(`fields[${count}].nameForeign`, {
                  onChange: (e) => {
                    setSelectedForeignTable(e.target.value);
                  },
                  value: selectedForeignTable.name,
                })}
              />
              <Input
                id={`field-name-${count}`}
                placeholder="Type"
                disabled
                value={selectedForeignTable.dataType}
                {...register(`fields[${count}].foreignKeyType`, {
                  value: selectedForeignTable.dataType,
                })}
              />
            </>
          )}
          {!selectedForeignTable && selectedTable && (
            <p>Esta tabla no tiene primary key, no puede ser foreign key</p>
          )}
        </div>
      )}
      {!foreign && (
        <>
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
            <div className="flex col items-center gap-2">
              <label className="h-fit">Primary key</label>
              <Checkbox
                className="h-fit"
                id={`field-primarykey-${count}`}
                {...register(`fields[${count}].primaryKey`)}
              />
            </div>
            <div className="flex col items-center gap-2">
              <label className="h-fit">Not Null</label>
              <Checkbox
                className="h-fit"
                id={`field-notnull-${count}`}
                {...register(`fields[${count}].notNull`)}
              />
            </div>
          </div>
        </>
      )}
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
  );
}

export default FieldGenerate;
