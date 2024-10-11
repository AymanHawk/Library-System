'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import UserNavbar from "../../../../components/UserNavbar";


function Lists() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname}/>
      Lists
    </div>
  )
}

export default Lists