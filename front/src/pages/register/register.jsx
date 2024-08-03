import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "@nextui-org/react"
import {Link} from "react-router-dom"


export default function Register() {

  return (
    <>
      <div className="flex flex-col flex-nowrap justify-center items-center h-[100vh] w-[100vw]">
        <Card className="w-[20rem] h-[30rem] bg-white
        rounded-md shadow-md p-5 space-y-5 rounded-xl 
        shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <CardHeader className="flex items-center justify-center" >
            <h2>Registrarse</h2>
          </CardHeader>
          <CardBody >
            <form className="flex flex-col items-center gap-5" >
              <div className="w-[100%] flex flex-col gap-5">
                <Input type="email" label="Username"
                 placeholder="Ingrese su nombre de usuario" />
              <Input type="email" label="Correo Electrónico"
                 placeholder="Ingrese su correo electrónico" />
              <Input type="password" label="Contraseña"
                placeholder="Ingrese su contraseña"/> 
              </div>
              <Button type="submit" color="primary" size="md" className="mt-6">Registrarse</Button>
            </form> 
          </CardBody>
          <CardFooter className="flex items-center justify-center m-0 p-0">
            <Link to="/login">
            <p className=" 
            text-xs	
            text-black hover:text-sky-600
            text-center
            ">¿Ya tienes cuenta?<br/> Iniciar Sesion.</p></Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}