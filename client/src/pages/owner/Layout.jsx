import React, { useEffect } from "react";
import Sidebar from "../../components/owner/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/owner/NavbarOwner";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { owner, navigate } = useAppContext();

  useEffect(() => {
    if (!owner) {
      navigate("/");
    }
  }, [owner]);
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
