'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useRouterContext } from '../../../../utils/RouterContext';
import LibNavbar from '../../../../components/LibNavbar';

function Books() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();

  const handleRouteClick = (path) => {
    router.push(path);
  }

  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      <div>
        Search bar
      </div>
      <div className='flex justify-between'>
        <div className='border-primary border-[1px] cursor-pointer rounded-md'>
          Filter
        </div>
        <div className='flex gap-2'>
          <div className='bg-secondary cursor-pointer' onClick={() => handleRouteClick(`/library/inventory/addBook/${id}`)}>
            upload single book
          </div>
          <div className='bg-secondary cursor-pointer' onClick={() => handleRouteClick(`/library/inventory/addMultipleBook/${id}`)}>
            upload multiple book
          </div>
        </div>
      </div>
      <div>
        results with pagination
      </div>
    </div>
  )
}

export default Books