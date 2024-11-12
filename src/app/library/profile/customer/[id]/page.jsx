'use client'
import React from 'react'
import LibNavbar from '../../../../../components/LibNavbar'
import { usePathname } from 'next/navigation'
import { useRouterContext } from '../../../../../utils/RouterContext';

function Edit() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();


  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      customer Profile
    </div>
  )
}

export default Edit