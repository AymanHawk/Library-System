"use client";
import React from "react";
import { useState } from "react";
import Home from "./Home.jsx";
import Fiction from "./Fiction.jsx";
import NonFiction from "./NonFiction.jsx";
import InYourArea from "./InYourArea.jsx";

export default function BrowserNavbar() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="text-primary my-[3%] mx-[6%] text-center text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl sm:flex justify-start hidden">
        <button className="sm:mr-6 mr-2 hover:bg-primary w-full hover:text-black" onClick={() => handleTabChange("home")}>Home</button>
        <button className="sm:mr-6 mr-2 hover:bg-primary w-full hover:text-black" onClick={() => handleTabChange("fiction")}>Fiction</button>
        <button className="sm:mr-6 mr-2 hover:bg-primary w-full hover:text-black" onClick={() => handleTabChange("popular")}>Non-Fiction</button>
        <button className="sm:mr-6 mr-2 hover:bg-primary w-full hover:text-black" onClick={() => handleTabChange("inyourarea")}>
          In Your Area
        </button>
        <a href="" className="mr-6 p-2 hover:bg-primary w-full hover:text-black">
          <button>
            Custom
          </button>
        </a>
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
