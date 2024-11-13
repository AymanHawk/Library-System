"use client";
import React from "react";
import { useState } from "react";
import Home from "./Home.jsx";
import Fiction from "./Fiction.jsx";
import NonFiction from "./NonFiction.jsx";
import InYourArea from "./InYourArea.jsx";
import { useRouterContext } from "../utils/RouterContext.jsx";

export default function BrowserNavbar() {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouterContext();


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePathClick = (path) => {
    router.push(path);
  }


  return (
    <div>
      <div className="text-primary my-[3%] mx-[6%] text-center text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl sm:flex justify-start hidden">
        <button className="mr-6 p-2 hover:bg-primary w-full hover:text-black" onClick={() => handleTabChange("home")}>Home</button>
        <button className="mr-6 p-2 hover:bg-primary w-full hover:text-black" onClick={() => handleTabChange("fiction")}>Fiction</button>
        <button className="mr-6 p-2 hover:bg-primary w-full hover:text-black" onClick={() => handleTabChange("popular")}>Non-Fiction</button>
        <button className="mr-6 p-2 hover:bg-primary w-full hover:text-black" onClick={() => handleTabChange("inyourarea")}>In Your Area</button>
        <button onClick={()=> handlePathClick("/browse/books/search")}>Custom</button>
      </div>

      <div className="tab-content">
        {activeTab === "home" && (
          <div>
            <Home />
          </div>
        )}

        {activeTab === "fiction" && (
          <div>
            <Fiction />
          </div>
        )}

        {activeTab === "popular" && (
          <div>
            <NonFiction />
          </div>
        )}

        {activeTab === "inyourarea" && (
          <div>
            <InYourArea />
          </div>
        )}
      </div>
    </div>
  );
}
