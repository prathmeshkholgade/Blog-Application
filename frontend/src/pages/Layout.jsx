import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="flex-grow my-14">
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
