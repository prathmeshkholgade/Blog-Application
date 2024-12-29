import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
       <Navbar/>
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="bg-red-400">
        <h2>footer</h2>
      </div>
    </div>
  );
}
