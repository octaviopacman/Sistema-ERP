import {
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  SelectItem,
  Select,
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import FieldGenerate from "../../../components/FieldGenerate";
import {useForm} from "react-hook-form";
import {createTables, tablesByUser} from "../../../queryFn/queryFn";
import {useNavigate} from "react-router-dom";

export default function CrearTablas() {
  const {handleSubmit, register, setValue, getValues} = useForm();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [messageError, setMessageError] = useState("");
  const [messageCreateError, setMessageCreateError] = useState([]);
  const [avaibleTablas, setAvaibleTablas] = useState([]);
  const [campos, setCampos] = useState([{id: 0}]);
  const [numCampos, setNumCampos] = useState(1);
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
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
        newFields.push({id: i});
      }
      setCampos((prevCampos) => [...prevCampos, ...newFields]);
    } else if (newFieldsCount < currentFieldsCount) {
      // Eliminar campos extra
      setCampos((prevCampos) => prevCampos.slice(0, newFieldsCount));
    }
  };

  const dataStructure = (data) => {
    const datos = [];
    let count = 0;
    campos.map((campo) => {
      data.fields.map((dato) => {
        if (count === campo.id) {
          datos.push(dato);
        }
        count++;
      });
      count = 0;
    });
    const datosEstructurados = {
      table_title: data.title,
      table_columns: datos,
      visibilidad: data.visibilidad,
    };
    let cont = 0;
    datos.forEach((valor) => {
      for (let prop in valor) {
        if (prop === "primaryKey") {
          if (valor[prop]) {
            cont += 1;
            if (cont > 1) {
              setMessageError("Hay más de una primary key");
            }
          }
        }
      }
    });

    if (cont > 1) {
      return messageError;
    }
    cont = 0;
    return datosEstructurados;
  };

  const handleEliminarCampo = (id) => {
    const camposFiltrados = campos.filter((campo) => campo.id != id);
    setCampos(camposFiltrados);
    /* setCampos((prevCampos) =>  prevCampos.filter((campo) => campo.id !== id)); */
  };

  const submit = handleSubmit(async (data) => {
    const preparedData = dataStructure(data);
    console.log("Datos enviados:", preparedData);
    if (!messageError && preparedData) {
      const data = {
        userId: 1,
        role: "Admin",
      };
      const res = await createTables(data.userId, preparedData);
      console.log(res);
      if (Array.isArray(res)) {
        console.log("!dadsa");
        return setMessageCreateError(res);
      }
      /*  navigate(0); */
    }
  });
  useEffect(() => {
    console.log(messageCreateError);
  }, [messageCreateError]);

  useEffect(() => {
    const tablesByUserId = async () => {
      try {
        const data = {
          userId: 1,
          role: "Owner",
        };
        const res = await tablesByUser(data.userId, data.role);
        if (!res) {
          return;
        }
        setTables(res);
      } catch (e) {
        console.log(e);
      }
    };
    tablesByUserId();
  }, []);

  return (
    <div className="p-5">
      <form onSubmit={submit}>
        <Input
          className="mb-2"
          label="Título de Tabla"
          placeholder="Título..."
          name="title"
          {...register(`title`, {required: true})}
        />
        <div className="p-3 mb-4">
          <Input
            className="mb-3"
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
                avaibleTablas={avaibleTablas}
                onDelete={handleEliminarCampo}
                tables={tables}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
          ))}
        </div>
        <Select
          className="mb-2 w-[50%]"
          label="Nivel de visibilidad"
          placeholder="Para"
          {...register(`visibilidad`, {required: true})}>
          <SelectItem value="owner" key="Owner">
            Solo Owners
          </SelectItem>
          <SelectItem value="admin" key="Admin">
            Admin
          </SelectItem>
          <SelectItem value="users" key="User">
            Todos
          </SelectItem>
        </Select>
        <div className="text-center flex flex-row gap-3 justify-end w-full">
          <Button
            onPress={onOpen}
            color="primary"
            onClick={() => {
              setMessageError("");
              setMessageCreateError([]);
            }}>
            Crear Tabla
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    ¿Estás seguro de crear esta tabla?
                  </ModalHeader>
                  <ModalBody>
                    {messageCreateError &&
                      messageCreateError.map((error, i) => {
                        return (
                          <p key={i} className="text-red-500 text-xs">
                            {error}
                          </p>
                        );
                      })}
                    {messageError && (
                      <p className="text-red-500 text-sm">{messageError}</p>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Volver
                    </Button>
                    <Button color="primary" type="submit" onClick={submit}>
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
