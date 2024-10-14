'use client'
import React from "react";
import { usePathname } from 'next/navigation';
import UserNavbar from "../../../../components/UserNavbar";

function Recomendations() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  
  return (
    <div>
      <UserNavbar userId={id} userPath={pathname}/>
      <div className='mx-20'>
        <div className=" border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
              Based on Survey
            </h1>
            <div className="w-[10%] h-48 bg-white">
              Books
            </div>
          </div>
        </div>
        <div className=" border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
              Based on recent Reads
            </h1>
            <div className="w-[10%] h-48 bg-white">
              Books
            </div>
          </div>
        </div>
        <div className=" border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
              Genre Picks
            </h1>
            <div className="w-[10%] h-48 bg-white">
              Books
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recomendations;
