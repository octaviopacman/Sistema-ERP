import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {NavHome} from "../../components/Navbars/NavHome";
import {useAuth} from "../../context/AuthContext";
import {useEffect} from "react";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm();
  const {isAuthenticated, loginError, loginUsuario} = useAuth();
  const navigate = useNavigate();

  const submit = handleSubmit(async (data) => {
    await loginUsuario(data);
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <NavHome />
      <div>
        <div className="flex flex-col flex-nowrap justify-center items-center h-[100vh] w-[100vw]">
          <Card
            className="w-[20rem] h-[25rem]
        p-5 space-y-5 rounded-xl 
        shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
            <CardHeader className="flex items-center justify-center">
              <p className="text-[#172b4d] text-xl ">Iniciar Sesión</p>
            </CardHeader>
            <CardBody className="overflow-hidden">
              <form
                onSubmit={submit}
                className="flex flex-col items-center gap-5">
                {loginError.map((error, i) => {
                  return (
                    <p key={i} className="text-red-500 text-xs">
                      {error}
                    </p>
                  );
                })}
                <div className="w-[100%] flex flex-col gap-5">
                  <Input
                    type="email"
                    label="Correo Electrónico"
                    placeholder="Ingrese su correo electrónico"
                    {...register(`email`, {required: true})}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      El email es obligatorio
                    </p>
                  )}
                  <Input
                    type="password"
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    {...register(`password`, {required: true})}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      la contraseña es obligatoria
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  color="primary"
                  size="md"
                  className="mt-6">
                  Iniciar Sesión
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
