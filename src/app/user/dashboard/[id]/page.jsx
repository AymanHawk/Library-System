'use client'
import React from "react";
import {DashboardNavbar }from "../../../../components/DashboardNavbar";

function Dashboard() {
  return (
    <div>
      <DashboardNavbar />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3">
        <div>
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Orders
          </h1>
          <div className="border border-secondary rounded-[5px] border-2 p-2">
            <a href="/user/orders">See All</a>
          </div>
        </div>
        <div>
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Recommendations
          </h1>
          <div className="border border-secondary rounded-[5px] border-2 p-2">
            <a href="/user/recommendation">See All</a>
          </div>
        </div>
        <div>
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Read Recently
          </h1>
          <div className="border border-secondary rounded-[5px] border-2 p-2">
            <a href="/user/list/readBooks">See All</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
