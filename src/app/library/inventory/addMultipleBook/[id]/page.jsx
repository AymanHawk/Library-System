'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useRouterContext } from '../../../../../utils/RouterContext';
import LibNavbar from '../../../../../components/LibNavbar';

function StockEdit() {

  const id = usePathname().split('/').pop();
  const router = useRouterContext();

  const handleRouterClick = (path) => {
    router.push(path);
  }

  return (
    <div>
      <LibNavbar libId={id} libPath={`/library/inventory/${id}`} />
      <div>
        <div>
          <h2>Book info</h2>
          <div>Upload File</div>
        </div>
      </div>
      <div>
        {/* added books parse */}
      </div>
      <div className='flex gap-2'>
        <div className='border-primary border-[1px] cursor-pointer rounded-md' onClick={() => handleRouterClick(`/library/inventory/${id}`)}>
          back
        </div>
        <div className='bg-secondary cursor-pointer'>
          upload
        </div>
      </div>
    </div>
  )
}

export default StockEdit