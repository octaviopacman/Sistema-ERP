import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";

export function NavHome() {
    const location = useLocation()
    const path =location.pathname

  
    return (
      <Navbar isBordered>
        <NavbarBrand>
  
          <Button className="font-bold text-inherit bg-transparent font-1" as={Link} to={"/"}>Sistema ERP</Button>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Caracteristicas
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Acerca de nosotros
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integraciones
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
            {path !== "/login" && (

          <NavbarItem>
            <Button as={Link} to={"/login"}color="primary" variant="ghost">
              Iniciar Sesión
            </Button>
          </NavbarItem>
            )}
          <NavbarItem className="hidden sm:flex">
            <ThemeSwitcher></ThemeSwitcher>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
  
  
  
    );
  }
  