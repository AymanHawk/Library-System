import React from "react";
import logo from "../../../images/the_shelves_bookshelf.png";
import dropdown from "../../../images/dropdown.png";
import Image from "next/image";

function Books() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-[5%] pl-[10%] pr-[5%]">
        <div className="md:col-span-1 flex items-end text-primary text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl leading-tight">
          <h1>
            The <br /> Shelves
          </h1>
        </div>

        <div className="md:col-span-2 md:flex">
          <Image
            src={logo}
            alt="Bookshelf"
            className="w-full min-w-[100px] max-w-full mr-[10%]"
          />
        </div>
      </div>
      <h2 className=" ml-[10%] mt-[5%] text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl border-2 border-primary rounded-lg inline-block p-2 pr-[5%] pl-[5%]">
        Filter
      </h2>
      <div className="mt-[5%] ml-[10vw] text-white sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
        <h1>Popular</h1>
        <h1>Everyone's Talking About</h1>
      </div>
    </div>
  );
}

export default Books;
