// import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { FooterSection } from "./Footer";
import { GlobalLoader } from "../components/GlobalLoader";
// import Cookies from "js-cookie";

const Wrapper = () => {
  return (
    <>
      <Header />
      <GlobalLoader />
      <main className="flex-1 pt-[160px] lg:pt-[140px] w-full">
        <Outlet />
      </main>
      <FooterSection />
    </>
  );
};

export default Wrapper;
