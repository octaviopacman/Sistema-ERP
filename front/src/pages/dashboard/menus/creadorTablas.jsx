import {
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import FieldGenerate from "../../../components/FieldGenerate";
import { useForm } from "react-hook-form";

export default function CrearTablas() {
  const { handleSubmit, register } = useForm();
  const [idField, setIdField] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [messageError, setMessageError] = useState("");
  let cont = 0;

  const [campos, setCampos] = useState([{ id: 0 }]);
  const [numCampos, setNumCampos] = useState(1);

  const datosEnviar = (data) => {
    return {
      tableTitle: data.title,
      fields: data.fields.map(field => ({
        name: field.name,
        dataType: field.dataType,
        length: field.length,
        autoIncrement: field.autoIncrement,
        primaryKey: field.primaryKey,
        notNull: field.notNull,
      })),
    };
  };

  
  

  // Maneja el cambio en el campo de número de campos
  const handleFieldCountChange = (e) => {
    const value = e.target.value;
    setNumCampos(value);
    updateCampos(value);
  };

  // Actualiza el estado de campos según el número ingresado
  const updateCampos = (count) => {
    const currentFieldsCount = campos.length;
    const newFieldsCount = parseInt(count, 10);

    if (newFieldsCount > currentFieldsCount) {
      // Agregar nuevos campos
      const newFields = [];
      for (let i = currentFieldsCount; i < newFieldsCount; i++) {
        newFields.push({ id: i });
      }
      setCampos((prevCampos) => [...prevCampos, ...newFields]);
    } else if (newFieldsCount < currentFieldsCount) {
      // Eliminar campos extra
      setCampos((prevCampos) => prevCampos.slice(0, newFieldsCount));
    }
  };

  const dataStructure = (data) => {
    const datosEstructurados = {
      table_title: data.title,
      table_columns: [],
    };

    campos.forEach((valor, i) => {
      let newObj = {};
      for (let prop in data) {
        if (prop[0] == i) {
          let str = prop.slice(1);
          if (str === "PrimaryKey") {
            if (data[prop]) {
              cont += 1;
              if (cont > 1) {
                setMessageError("Hay más de una primary key");
              } else {
                newObj[str] = data[prop];
              }
            } else {
              newObj[str] = data[prop];
            }
          } else {
            newObj[str] = data[prop];
          }
        }
      }
      if (Object.keys(newObj).length > 0) {
        datosEstructurados.table_columns.push(newObj);
      }
    });
    cont = 0;
    return datosEstructurados;
  };

  const handleEliminarCampo = (id) => {
    setCampos((prevCampos) => prevCampos.filter((campo) => campo.id !== id));
  };

  const submit = handleSubmit(async (data) => {
    if (!messageError) {
      const preparedData = prepareDataToSend(data);
  
      try {
        const response = await fetch('thiago mandale dale', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preparedData),
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar los datos');
        }
  
        const result = await response.json();
        console.log('Respuesta del servidor:', result);
  
        // Maneja la respuesta del servidor aquí
  
      } catch (error) {
        console.error('Error:', error);
        // Maneja el error aquí
      }
    }
  });
  

  useEffect(() => {
    const timer = setTimeout(() => setMessageError(""), 2000);
    return () => clearTimeout(timer);
  }, [messageError]);

  return (
    <div className="p-5">
      <form onSubmit={submit}>
        <Input
          label="Título de Tabla"
          placeholder="Título..."
          name="title"
          {...register(`title`, { required: true })}
        />
        <div className="p-3">
          <Input
            type="number"
            label="Número de campos"
            min={1}
            value={numCampos}
            onChange={handleFieldCountChange}
            placeholder="¿Cuántos campos quieres crear?"
          />
          {campos.map((campo) => (
            <div key={campo.id}>
              <FieldGenerate
                register={register}
                count={campo.id}
                onDelete={handleEliminarCampo}
              />
            </div>
          ))}
        </div>
        <div className="text-center flex flex-row gap-3 justify-center w-full">
          <Button onPress={onOpen}>Crear Tabla</Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    ¿Estás seguro de crear esta tabla?
                  </ModalHeader>
                  <ModalBody>
                    {messageError && (
                      <p className="text-red-500 text-sm">{messageError}</p>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Volver
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      onClick={submit}
                    >
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
  );
}
