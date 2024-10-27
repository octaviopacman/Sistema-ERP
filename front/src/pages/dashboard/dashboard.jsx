import React from "react";
//import SideBar from "./menus/sidebar.jsx";
import SkeleTon from "./skeleton.jsx";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Outlet } from "react-router-dom";
import NavBarDashboard from "../../components/Navbars/NavbarDashboard.jsx";
import { TabProvider } from "../../components/tabContext.jsx";



function Dashboard() {
  let pestanas = [];

  return (
    <div>
      <TabProvider>
        <NavBarDashboard />
        <Outlet />
      </TabProvider>
      
    </div>
  )
}

export default Dashboard;