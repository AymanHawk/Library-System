
import React, { useState } from "react";
import { useRouterContext } from "../utils/RouterContext";


function UserNavbar({ userId, userPath }) {
  const [ham, setHam] = useState(true);
  const router = useRouterContext();
  const routes = [
    { path: `/user/dashboard/${userId}`, label: 'Dashboard' },
    { path: `/user/stats/${userId}`, label: 'Statistics' },
    { path: `/user/orders/${userId}`, label: 'Orders' },
    { path: `/user/recommendation/${userId}`, label: 'Recommendations' },
    { path: `/user/list/${userId}`, label: 'Books List' },
  ];

  const handleRoutes = (path) => {
    console.log("activated")
    router.push(path);
  }

  const toggleSwitch = () => {
    setHam(!ham)
  }
  return (
    <div>
      <div className="text-primary my-[3%] mx-[6%] text-center text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl sm:flex justify-evenly hidden">
        {routes.map((route) => (
          <button
            key={route.path}
            onClick={() => handleRoutes(route.path)}
            className={`p-2 hover:bg-primary w-full hover:text-black text-nowrap ${userPath === route.path ? 'bg-primary text-black' : ''}`}
          >
            {route.label}
          </button>
        ))}
      </div>
      <div className="border-primary border-[1px] bg-background rounded-md w-11/12 mx-auto flex flex-col p-1 mb-5 sm:hidden">
        <div className="flex justify-end m-1 mb-2">
          <button className="relative h-6 w-8" onClick={toggleSwitch}>
            {/* <div className="border-primary border-b-[2px] w-8 mb-2"></div> */}
            <div className={` ${(ham ? ' mb-2 ' : ` absolute top-1/2 left-0 w-full transform -translate-y-1/2 rotate-45`)} transition-all duration-500 border-primary border-b-[2px] `}></div>
            <div className={`${ham ? ' ' : 'opacity-0'} transition-opacity duration-300 border-primary border-b-[2px] w-full`}></div>
            <div className={`${(ham ? ' mt-2 ' : ` absolute top-1/2 left-0 w-full transform -translate-y-1/2 -rotate-45`)} transition-all duration-500 border-primary border-b-[2px] `}></div>
            {/* <div className="border-primary border-b-[2px] w-8 mt-2"></div> */}
          </button>
        </div>
        <div className={` ${(ham ? 'hidden' : '')} border-t-2 border-primary pt-2 `}>
          <div className="text-primary text-center text-lg flex flex-col items-center justify-center">
            {routes.map((route) => (
              <button
                key={route.path}
                onClick={() => handleRoutes(route.path)}
                className={`p-2 hover:bg-primary w-full hover:text-black text-nowrap ${userPath === route.path ? 'bg-primary text-black rounded-md' : ''}`}
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserNavbar

