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
  const [selectedField, setSelectedField] = useState(null);
  const [load, setLoad] = useState(true);
  const [foreignLoad, setForeignLoad] = useState(true);
  const [isAutoIncrement, setIsAutoIncrement] = useState(false);

  const TablaSeleccionada = (e) => {
    const tabla = tables.find((tabla) => tabla.nombre_tabla === e.target.value);
    setSelectedTable(e.target.value);
    const campos = [];
    const campoPrimario = tabla.campos.find((c) => c.primaryKey === true);
    const campoUnique = tabla.campos.find(
      (c) => c.unique === true && c.name != campoPrimario.name
    );
    if (campoPrimario) {
      campos.push(campoPrimario);
    }
    if (campoUnique) {
      campos.push(campoUnique);
    }
    campoPrimario.pk = "PK";
    setSelectedForeignTable(campos);
    console.log(selectedForeignTable);
    setLoad(false);
  };
  const Cambiar = (e) => {
    const campo = selectedForeignTable.find((f) => f.name === e.target.value);
    setSelectedField(campo);
    console.log(campo);
    let type = campo.dataType ? campo.dataType : "Int";
    setValue(`fields[${count}].foreignKeyType`, type);
  };
  const returnInputs = () => {
    if (selectedField.dataType) {
      return (
        <Input
          id={`field-name-${count}`}
          placeholder="Type"
          disabled
          value={selectedField.dataType}
          {...register(`fields[${count}].foreignKeyType`, {
            value: selectedField.dataType,
          })}
        />
      );
    } else {
      return <Input disabled value={"Int"} />;
    }
  };

  useEffect(() => {
    if (selectedField) {
      setValue(`fields[${count}].foreignKeyType`, selectedField.dataType);
      setValue(`fields[${count}].name`, "");
      setValue(`fields[${count}].primaryKey`, false);
      setValue(`fields[${count}].notNull`, false);
      setValue(`fields[${count}].length`, "");
      setValue(`fields[${count}].dataType`, "");
      setValue(`fields[${count}].autoIncrement`, false);
      setValue(`fields[${count}].nameForeign`, selectedField.name);
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
    if (isAutoIncrement) {
      setValue(`fields[${count}].autoIncrement`, true);
      setValue(`fields[${count}].dataType`, "");
      setValue(`fields[${count}].length`, "");
    }
  }, [isAutoIncrement]);

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
              <Select
                id={`field-foreign-table-${count}`}
                label="Campo de la tabla"
                {...register(`fields[${count}].nameForeign`, {
                  onChange: (e) => {
                    Cambiar(e);
                  },
                })}>
                {selectedForeignTable &&
                  selectedForeignTable.map((campo) => (
                    <SelectItem key={campo.name} value={campo.name}>
                      {`${campo.name} ${campo.pk ? ` (${campo.pk})` : " "}`}
                    </SelectItem>
                  ))}
              </Select>
              {selectedField && returnInputs()}
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
          {!isAutoIncrement && (
            <>
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
            </>
          )}
          <div className="flex gap-5 ml-4">
            <div className="flex flex-col items-center gap-2">
              <label className="h-fit">Auto Increment</label>
              <Checkbox
                className="h-fit"
                id={`field-autoincrement-${count}`}
                {...register(`fields[${count}].autoIncrement`, {
                  onChange: (e) => {
                    setIsAutoIncrement(e.target.checked);
                  },
                })}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <label className="h-fit">Unique</label>
              <Checkbox
                className="h-fit"
                id={`field-unique-${count}`}
                {...register(`fields[${count}].unique`)}
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
