import React from "react";
import { DashboardNavbar } from "../../../../components/DashboardNavbar";

function Recomendations() {
  return (
    <div>
      <DashboardNavbar />
      <div>
        <div className="border border-secondary rounded-[5px] border-2 p-3 mb-[5%]">
          <div className="flex justify-between items-center">
            <h1 className="text-white sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
              Based on Survey
            </h1>
            <a href="" className="text-1xl">
              See All
            </a>
          </div>
          {/* Books go here */}
        </div>
        <div className="border border-secondary rounded-[5px] border-2 p-3">
          <div className="flex justify-between items-center">
            <h1 className="text-white sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
              Based on Recent Reads
            </h1>
            <a href="" className="text-1xl">
              See All
            </a>
            {/* Books go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recomendations;
