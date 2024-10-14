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
      <div className='w-[80%] mx-auto'>
        <h1 className='text-primary text-3xl text-left lg:text-4xl mb-5'>Orders</h1>
        <div className='border-[1px] border-secondary border-solid rounded-lg flex flex-col px-4 py-2 gap-2'>
            <div className='h-[20%] flex justify-between '>
              <div className='flex flex-col'>
                <h3 className='text-[#D9D9D9] text-sm'>Order ID</h3>
                <h2 className='text-primary text-lg'>#234132</h2>
              </div>
              <h2 className='text-[#D9D9D9] text-base'>Estimated Delivery Date: <span className='text-primary text-lg'>30th Oct 2024</span></h2>
            </div>
            <div className='h-[80%] flex justify-between items-end'>
              <div className='w-[80%]'>
                <div className='w-[30%] flex gap-4'>
                  <div className='w-[40%] h-36 bg-white mb-3'>
                  </div>
                  <div className='w-50% pt-2'>
                    <h2 className='text-primary text-2xl text-nowrap'>One Piece</h2>
                    <p className='text-[#D9D9D9]] text-lg'> Eiichiro Oda</p>
                    <p className='text-[#D9D9D9]] text-base'> Manga</p>
                  </div>
                </div>
                
              </div>
              <div className='w-[20%] flex justify-end'>
                <button className='rounded-full bg-secondary px-5 py-2 text-nowrap text-lg'>
                  View Details
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default orderId