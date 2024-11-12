'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useRouterContext } from '../../../../utils/RouterContext';
import LibNavbar from '../../../../components/LibNavbar';

function Books() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();

  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />

      Books
    </div>
  )
}

export default Books