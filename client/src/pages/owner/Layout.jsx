import React from "react";
import Sidebar from "../../components/owner/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/owner/NavbarOwner";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
