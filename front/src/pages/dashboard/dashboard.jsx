import React from "react";
import NavBar from "./navbar";
//import SideBar from "./menus/sidebar.jsx";
import SkeleTon from "./skeleton.jsx";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Outlet} from "react-router-dom";



function Dashboard(){
  let pestanas = [];

  return (
    <div>
      <NavBar />
      
      <Outlet/>
   

    </div>
  )
}

export default Dashboard;