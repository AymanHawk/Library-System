import React from "react";

export const DashboardNavbar = () => {
  return (
    <div className="text-primary mt-[3%] mb-[3%] mr-[6%] ml-[6%] sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl justify-items-center grid gap-1 grid-cols-3 lg-grid-cols-5 xl:grid-cols-5 justify-items-center">
      <h2>Dashboard</h2>
      <h2>Statistics</h2>
      <h2>Orders</h2>
      <h2>Recommendations</h2>
      <h2>Books List</h2>
    </div>
  );
};
