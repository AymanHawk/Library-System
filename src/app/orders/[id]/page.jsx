'use client'
import { useRouterContext } from '@/utils/RouterContext';
import { useOrganization, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import cross from '../../../images/cross.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading.jsx'

function Orders() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();
  const { user } = useUser();
  const { organization } = useOrganization();
  const [order, setOrder] = useState(null);
  const [confPop, setConfPop] = useState(false);

  const onConfirmClick = async () => {
    try {
      const res = await fetch('/api/order', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: id }),
      })

      if (!res.ok) {
        console.error("Failed to update order status", res.statusText);
        return;
      }
      const data = await res.json();
      if (data.success) {
        toast.success('Order Marked for Return');
      } else {
        toast.error('Failed to Return the Order, please try again');
      }
      setConfPop(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to Return the Order, please try again');
    }

    try {

    } catch (err) {
      console.error(err);
    }
  }

  const handlePath = (path) => {
    router.push(path);
  }

  const getOrder = async () => {
    try {
      const res = await fetch('/api/order', {
        method: 'GET',
        headers: {
          orderId: id,
        }
      })

      if (!res.ok) {
        throw new Error('Error getting the book');
      }
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getOrder()
  }, []);

  return (
    <div className='w-[80%] mx-auto'>
      <div className={(confPop ? '' : 'hidden') + ` absolute border-secondary border-[1px] ml-[400px] rounded-md p-5 bg-background`}>
        <div className='flex justify-end'>
          <Image src={cross} alt='cross' className='transition-transform duration-300 hover:scale-[1.01]' width={25} height={25} onClick={() => { setConfPop(false) }} />
        </div>
        <div className='flex flex-col my-2 gap-2 justify-center text-primary items-center'>
          Confirm the Books Return
          <button className='bg-secondary transition-transform duration-300 hover:scale-[1.01] px-3 py-1 w-[50%] text-center rounded-md text-white' onClick={onConfirmClick}>
            Confirm
          </button>
        </div>


      </div>
      {order ? (
        order.length > 0 ? (
          order.map(ord => (
            <div key={ord._id}>
              <h2 className='text-primary text-xl m-2 ml-6'>#{ord._id}</h2>
              <div className='flex justify-evenly items-start'>
                <div className='border-secondary p-5 w-[70%] border-[1px] rounded-md'>
                  {ord.books ? (
                    ord.books.map(book => (
                      <div key={book._id} className='flex flex-row gap-1 p-1 hover:bg-loading border-b-[1px] w-full pb-4 mb-4 last:mb-0 last:border-b-0 transition-transform duration-300 hover:scale-[1.01]'>
                        <div className=''>
                          <h2 className='text-primary text-lg cursor-pointer' onClick={() => { handlePath(`/books/${book._id}`) }}>{book.title}</h2>
                          <div className='flex text-sm'>
                            <div>
                              <Image src={book.imgSrc} width={75} height={150} alt='book.title' />
                            </div>
                            <div className='flex flex-col items-start'>
                              <h2 className=''>{book.author}</h2>
                              {book.isbn && (
                                <h2>
                                  ISBN #{book.isbn}
                                </h2>
                              )
                              }
                              <h2 className='capitalize'>{book.genre.slice(0, 2).join(', ')}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                    )
                  ) : (
                    <div>
                      No Books
                    </div>
                  )
                  }
                </div>
                <div className='w-[25%]'>
                  <div className='border-secondary p-2 border-[1px]  text-primary rounded-md'>
                    <h2 className='text-center font-bold '>Order Info</h2>
                    <div className='flex flex-col p-2'>
                      <span className='flex justify-between'>
                        <h4>Ordered Date:</h4>
                        <h4 className='text-right'>{new Date(ord.orderAt).toLocaleDateString('en-US')}</h4>
                      </span>
                      <span className='flex justify-between'>
                        <h4>Delivery Date:</h4>
                        <h4 className='text-right'>{new Date(ord.deliveryDate).toLocaleDateString('en-US')}</h4>
                      </span>
                      <span className='flex justify-between'>
                        <h4>Library Name:</h4>
                        <h4 className='text-right'>{ord.libName}</h4>
                      </span>
                      <span className='flex justify-between'>
                        <h4>Order By:</h4>
                        <div className='flex gap-1'>
                          <Image src={ord.userImg} className='rounded-full' width={25} height={25} alt={ord.userId} />
                          <h4>{ord.userName}</h4>
                        </div>
                      </span>
                    </div>
                    <div className='flex justify-center mb-2'>
                      {(user && !organization && order.orderStatus !== 'return') && (
                        <button className='bg-secondary px-3 py-1 transition-transform duration-300 hover:scale-[1.01] rounded-md text-white' onClickCapture={() => { setConfPop(true) }}>
                          Return Books
                        </button>
                      )
                      }
                    </div>
                  </div>
                  <div className='flex justify-center my-2'>
                    {(user && organization) && (
                      <button className='bg-secondary px-3 py-1 rounded-md text-white transition-transform duration-300 hover:scale-[1.01]' onClick={() => { handlePath(`/library/orders/${organization.id}`) }}>
                        Back to all Orders
                      </button>
                    )
                    }
                  </div>

                </div>

              </div>
            </div>
          ))
        ) : (
          <div>
            Order not found with id: #{id}
          </div>
        )
      ) : (
        <div>
          <Loading />
        </div>
      )

      }
    </div>
  )
}

export default Orders