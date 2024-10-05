'use client'
import React from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import UserNavbar from "../../../../components/UserNavbar";

function Recomendations() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  
  return (
    <div>
      <UserNavbar userId={id} userPath={pathname}/>
      <div>
        <div className=" border-secondary rounded-md border-2 p-3 mb-[5%]">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
              Based on Survey
            </h1>
          </div>
          {/* Books go here */}
        </div>
        <div className=" border-secondary rounded-md border-2 p-3">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
              Based on Recent Reads
            </h1>
            {/* Books go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recomendations;
