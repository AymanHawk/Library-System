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
      <div className='sm:mx-20 mx-5'>
        <div className=" border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <div className="flex justify-between items-center w-[99%]">
              <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
                Based on Survey
              </h1>
              <a href="#" className="text-white text-[10px] sm:text-sm md:text-base norm:text-lg lg:text-xl">See All</a>
            </div>
            
            <div className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28  bg-white">
              Books
            </div>
          </div>
        </div>
        <div className=" border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <div className="flex justify-between items-center w-[99%]">
              <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
                Based on Survey
              </h1>
              <a href="#" className="text-white text-[10px] sm:text-sm md:text-base norm:text-lg lg:text-xl">See All</a>
            </div>
            <div className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28  bg-white">
              Books
            </div>
          </div>
        </div>
        <div className=" border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <div className="flex justify-between items-center w-[99%]">
              <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
                Based on Survey
              </h1>
              <a href="#" className="text-white text-[10px] sm:text-sm md:text-base norm:text-lg lg:text-xl">See All</a>
            </div>
            <div className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28  bg-white">
              Books
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recomendations;
