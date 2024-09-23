import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  
  const pathname = useLocation();
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>

          <p className="font-bold text-inherit">ERP</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className=" sm:flex gap-4" justify="center">
        <Tabs className="flex items-center gap-2" size="sm" selectedKey={pathname} aria-label="Tabs">
          <Tab className="text-gray-500 hover:text-gray-800" id="/dashboard" href="/dashboard" >Dashboard <i className="bi bi-x"></i></Tab>
          <Tab className="text-gray-500 hover:text-gray-800" id="/dashboard/actividad" href="/dashboard/actividad">Actividad <i className="bi bi-x"></i></Tab>
          <Tab className="text-gray-500 hover:text-gray-800" id="/dashboard/estadisticas" href="/dashboard/estadisticas">Estadísticas <i className="bi bi-x"></i></Tab>
          <Tab className="text-gray-500 hover:text-gray-800" id="/dashboard/creador" href="/dashboard/creador">Creador <i className="bi bi-x"></i></Tab>
        </Tabs>

      </NavbarContent>
      <NavbarContent justify="end">


        <NavbarItem className="hidden lg:flex">
          <Link href="#"><i className="bi bi-info-circle"></i></Link>
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>

              <Button as={Link} color="primary" href="#" variant="flat">
                <i className="bi bi-person-circle"></i>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Perfil</DropdownItem>
              <DropdownItem>Ajustes</DropdownItem>
              <DropdownItem className="text-danger">Cerrar Sesión</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>


        <NavbarMenu className="md:w-1/5">
          <NavbarItem><a href="/dashboard"><i className="bi bi-house"></i>  Dashboard </a> </NavbarItem>
          <NavbarItem><a href="/dashboard/actividad"><i className="bi bi-activity"></i>  Actividad </a></NavbarItem>
          <NavbarItem><a href="/dashboard/estadisticas"><i className="bi bi-bar-chart"></i> Estadísticas </a></NavbarItem>
          <NavbarItem><a href="/dashboard/creador"> <i className="bi bi-bar-chart"></i> Creador </a></NavbarItem>
        </NavbarMenu>
      </NavbarContent>

    </Navbar>
  );
}
