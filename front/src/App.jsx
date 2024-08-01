import { Button,
Navbar,
NavbarBrand,
NavbarContent
 } from "@nextui-org/react"

function App() {

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <NavbarContent>NextUI</NavbarContent>
        </NavbarBrand>
        <NavbarContent>
          <Button variant="outline">Ayuda</Button>
          <Button>Cuenta</Button>
        </NavbarContent>
      </Navbar>
      <div className=" flex justify-center align-center ">
    <div className=" flex justify-center flex-col	 w-72 h-80 mt-[5rem] bg-slate-200 rounded-lg">
      <h1 className="text-3xl font-bold">Bienvenido</h1>
      <Button color="primary" >Iniciar Sesión</Button>
    </div>
      </div>
    </>
  )
}

export default App
