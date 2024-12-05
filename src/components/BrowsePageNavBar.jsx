"use client";
import React from "react";
import { useState } from "react";
import Home from "./Home.jsx";
import Fiction from "./Fiction.jsx";
import NonFiction from "./NonFiction.jsx";
import InYourArea from "./InYourArea.jsx";
import { useRouterContext } from "../utils/RouterContext.jsx";

export default function BrowserNavbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const router = useRouterContext();
  const tabs = [
    'Home', 'Fiction', 'Non-Fiction',
  ]

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePathClick = (path) => {
    router.push(path);
  }


  return (
    <div>
      <div className="text-primary my-[3%] mx-[6%] text-center text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl sm:flex justify-center hidden">
        {tabs.map(tab => (
          <button
            key={tab}
            className={(tab === activeTab ? 'bg-primary text-black ' : ' ') + ` p-2 w-full hover:bg-primary  hover:text-black`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))
        }
        <button className=" p-2 hover:bg-primary w-full hover:text-black" onClick={() => handlePathClick("/browse/books/search")}>Custom</button>
      </div>

      <div className="tab-content">
        {activeTab === "Home" && (
          <div>
            <Home />
          </div>
        )}
        {activeTab === "Fiction" && (
          <div>
            <Fiction />
          </div>
        )}
        {activeTab === "Non-Fiction" && (
          <div>
            <NonFiction />
          </div>
        )}
      </div>
    </div>
  );
}
