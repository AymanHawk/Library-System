'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import UserNavbar from "../../../../components/UserNavbar";
import Pagination from '../../../browse/books/search/results/Pagination.jsx';


function orderId() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const [totalCount, setTotalCount] = useState(0);

  const getOrders = async () => {
    try {
      const res = await fetch('/api/user/orders', {
        method: 'GET',
        headers: {
          userId: id,
          limit: limit,
          page: currentPage
        }
      })

      if (!res.ok) {
        throw new Error(`Error fetching orders`);
      }

      const data = await res.json();

      console.log(data);

      setOrders(data.orders);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />
      {(orders && orders.length > 0) ? (
        orders.map(order => (
          <div key={order._id} className='border-secondary border-[1px] py-2'>
            <h3>Order ID: {order._id}</h3>
            <div>
              {order.books.map(book => (
                <div key={book._id} className='flex flex-col items-center border-secondary border-[1px]'>
                  <div>{book.title}</div>

                </div>
              ))}
              <button className='bg-secondary' onClick={() => { moreDetials(`/orders/${order._id}`) }}>
                More Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )

      }
      <div className='w-[80%] mx-auto'>
        <h1 className='text-primary text-3xl text-left lg:text-4xl mb-5'>Orders</h1>
        <div className='border-[1px] border-secondary border-solid rounded-lg flex flex-col px-4 py-2 gap-2'>
          <div className='h-[20%] flex justify-between '>
            <div className='flex flex-col'>
              <h3 className='text-[#D9D9D9] md:text-sm text-[10px]'>Order ID</h3>
              <h2 className='text-primary md:text-lg text-sm'>#234132</h2>
            </div>
            <div className='flex flex-col items-end'>
              <h2 className='text-[#D9D9D9] md:text-base text-sm text-wrap xs:text-[10px] '>Delivery Date: <span className='text-primary hidden sm:block text-lg'>30th Oct 2024</span></h2>
              <span className='text-primary block sm:hidden text-base xs:text-sm '>30th Oct 2024</span>
            </div>
          </div>
          <div className='h-[80%] flex justify-between items-end'>
            <div className='w-[80%]'>
              <div className='flex gap-4'>
                <div className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28  bg-white">
                  Books
                </div>
                <div className='w-50% pt-2'>
                  <h2 className='text-primary sm:text-lg norm:text-2xl lg:text-2xl text-nowrap text-base'>One Piece</h2>
                  <p className='text-[#D9D9D9]] sm:text-base norm:text-lg lg:text-lg text-sm'> Eiichiro Oda</p>
                  <p className='text-[#D9D9D9]] sm:text-sm norm:text-base lg:text-base text-[10px]'> Manga</p>
                </div>
              </div>

            </div>
            <div className='w-[20%] flex justify-end'>
              <button className='rounded-full bg-secondary sm:px-5 sm:py-2 text-nowrap sm:text-lg p-2 text-[10px]'>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        limit={limit}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default orderId