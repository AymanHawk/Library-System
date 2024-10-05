'use client'
import React from "react";
import UserNavbar from "../../../../components/UserNavbar";
import { usePathname, useSearchParams } from 'next/navigation';

function Dashboard() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname}/>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3">
        <div>
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Orders
          </h1>
          <div className=" border-secondary rounded-[5px] border-2 p-2">
            <a href="/user/orders">See All</a>
          </div>
        </div>
        <div>
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Recommendations
          </h1>
          <div className=" border-secondary rounded-[5px] border-2 p-2">
            <a href="/user/recommendation/id">See All</a>
          </div>
        </div>
        <div>
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Read Recently
          </h1>
          <div className=" border-secondary rounded-[5px] border-2 p-2">
            <a href="/user/list/readBooks">See All</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
