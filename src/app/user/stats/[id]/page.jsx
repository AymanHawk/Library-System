'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import UserNavbar from "../../../../components/UserNavbar";


function Stats() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname}/>
      Stats
    </div>
  )
}

export default Stats