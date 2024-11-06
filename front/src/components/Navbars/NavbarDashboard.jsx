import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import {useLocation, Link, useNavigate} from "react-router-dom"; // Para obtener el pathname actual
import {useTabContext} from "../tabContext";

export default function NavBarDashboard() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {tabs, addTab, removeTab, hideTab, showTab} = useTabContext();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const onclick = (name, path) => {
    showTab(name);
    navigate(path);
  };

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

      <Tabs size="sm" selectedKey={pathname}>
        {tabs &&
          tabs.map(
            (tab, i) =>
              tab.visible && (
                <Tab
                  className="pr-[0.3rem]"
                  key={tab.path}
                  id={tab.path}
                  title={
                    <div className="flex row gap-2 items-center">
                      <Link to={tab.path} className="mb-0.5">
                        {tab.name}
                      </Link>

                      <i
                        className="bi bi-x text-lg "
                        onClick={(e) => {
                          e.preventDefault();
                          hideTab(tab.name, i);
                        }}></i>
                    </div>
                  }></Tab>
              )
          )}
      </Tabs>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">
            <i className="bi bi-info-circle"></i>
          </Link>
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
          {tabs &&
            tabs.map((tab) => (
              <NavbarItem key={tab.path}>
                <button
                  onClick={() => onclick(tab.name, tab.path)}
                  className="p-2 text-gray-700 hover:text-gray-900">
                  {tab.name}
                </button>
              </NavbarItem>
            ))}
        </NavbarMenu>
        <NavbarItem>
          <ThemeSwitcher></ThemeSwitcher>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
