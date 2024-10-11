'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import UserNavbar from "../../../../components/UserNavbar";


function orderId() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname}/>
      orderId
    </div>
  )
}

export default orderId