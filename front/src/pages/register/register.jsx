import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext";
import {useState} from "react";
import {NavHome} from "../../components/Navbars/NavHome";

export default function Register() {
  const {handleSubmit, register, formState: errors} = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const {registrarUsuario, registroError} = useAuth();

  const submit = handleSubmit(async (data) => {
    const peticion = await registrarUsuario(data);
    if (peticion) {
      setSuccessMessage("Usuario creado exitosamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  });

  return (
    <>
      <NavHome />
      <div className="flex flex-col flex-nowrap justify-center items-center h-[100vh] w-[100vw]">
        <Card
          className="w-[20rem] md:h-[40rem] 
        rounded-md  p-5 space-y-5 
        shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <CardHeader className="flex items-center justify-center">
            <h2 className="text-[#172b4d]">Registrarse</h2>
          </CardHeader>
          <CardBody>
            <form
              className="flex flex-col items-center gap-5"
              onSubmit={submit}>
              {registroError.map((error, i) => {
                <p className="text-red-500 text-xs" key={i}>
                  {error}
                </p>;
              })}
              <div className="w-[100%] flex flex-col gap-5">
                <Input
                  type="text"
                  label="Nombre"
                  placeholder="Ingrese el nombre"
                  {...register(`firstName`, {required: true})}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    El Nombre es obligatorio
                  </p>
                )}

                <Input
                  type="text"
                  label="Apellido"
                  placeholder="Ingrese el apellido"
                  {...register(`lastName`, {required: true})}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    El Apellido es obligatorio
                  </p>
                )}
                <Input
                  type="email"
                  label="Correo Electrónico"
                  placeholder="Ingrese su correo electrónico"
                  {...register(`email`, {required: true})}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">El email obligatorio</p>
                )}
                <Select
                  label="Selecciona un rol para el usuario"
                  className="max-w-xs"
                  {...register(`role`, {required: true})}>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">Usuario</SelectItem>
                  <SelectItem value="Solo_ver">Solo ver</SelectItem>
                </Select>
                {errors.role && (
                  <p className="text-red-500 text-xs">Debes elegir un rol</p>
                )}
                <Input
                  type="password"
                  label="Contraseña"
                  placeholder="Ingrese la Contraseña"
                  {...register(`password`, {required: true})}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    Es obligatorio ingresar una contraseña
                  </p>
                )}
              </div>

              {successMessage && (
                <p className="text-green-500 text-xs">{successMessage}</p>
              )}
              <Button type="submit" color="primary" size="md" className="mt-6">
                Registrarse
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
