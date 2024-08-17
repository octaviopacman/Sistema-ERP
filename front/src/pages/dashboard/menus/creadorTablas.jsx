import {
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import React from "react";
import FieldGenerate from "../../../components/FieldGenerate";
import {useForm} from "react-hook-form";
/* const tablaCol = {
    column_name: "id",
    data_type: "integer",
    is_primary_key: true,
    is_auto_increment: true
} */

export default function CrearTablas() {
  const {handleSubmit, register} = useForm();
  const [idField, setIdField] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [campos, setCampos] = React.useState([
    <FieldGenerate key={0} register={register} count={0} />,
  ]);

  const handleClickerSubmit = () => {
    const camposNuevos = [...campos];
    const longitudNueva = campos.length;
    camposNuevos.push(
      <FieldGenerate
        key={longitudNueva}
        register={register}
        count={longitudNueva}
      />
    );
    setCampos(camposNuevos);
    setIsDeleting(false);
  };
  const handlerSubmitEliminar = (e) => {
    console.log(campos[0].key);
    const id = e.target.id;
    const camposNuevos = campos.filter((campo) => id !== Number(campo.key));
    console.log(camposNuevos);
    setIdField(parseInt(e.target.id) + 1);
    setIsDeleting(true);
    e.target.parentElement.remove();
    console.log(campos);
  };
  const submit = handleSubmit((data) => {
    if (isDeleting) {
      for (const prop in data) {
        if (parseInt(prop[0]) === idField) {
          delete data[prop];
        }
      }
      return console.log(data);
    }
    for (const prop in data) {
      if (parseInt(prop[0]) === idField) {
        delete data[prop];
      }
    }
    const datosEstructurados = {
      table_title: data.title,
      table_columns: [],
    };

    campos.forEach((valor, i) => {
      let newObj = {};
      for (let prop in data) {
        if (prop[0] == i + 1) {
          let str = prop.slice(1);
          newObj[str] = data[prop];
        }
      }
      datosEstructurados.table_columns.push(newObj);
    });

    console.log(datosEstructurados);
    /* 
        createTable(data) */
  });
  return (
    <>
      <div className="p-5">
        <form onSubmit={submit}>
          <Input
            label="Título de Tabla"
            placeholder="Título..."
            name="titleTable"
            {...register(`title`, {required: true})}
          />
          <div className="p-3">
            {campos.map((campos, i) => {
              return (
                <div key={i}>
                  <div>
                    {campos}
                    <Button
                      size="sm"
                      className="text-red-500"
                      variant="primary"
                      onClick={handlerSubmitEliminar}
                      id={i}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Button onPress={onOpen}>Crear Tabla</Button>
            <Button onClick={handleClickerSubmit}>Agregar Campo</Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      ¿Estas seguro de crear esta tabla?
                    </ModalHeader>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Volver
                      </Button>
                      <Button
                        color="primary"
                        type="submit" /* onPress={onClose} */
                        onClick={submit}>
                        Crear
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </form>
      </div>
    </>
  );
}
