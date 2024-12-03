'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouterContext } from '../../../../utils/RouterContext';
import LibNavbar from '../../../../components/LibNavbar';
import Pagination from '../../../browse/books/search/results/Pagination.jsx';

function orderId() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();
  const [preOrder, setPreOrder] = useState([]);
  const [confOrder, setConfOrder] = useState([]);
  const [retOrder, setRetOrder] = useState([]);
  const [section, setSection] = useState('prepare')
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);


  const fetchOrders = async () => {
    setLoading(true);
    try {
      const endpointMap = {
        prepare: '/api/library/orders/prepared',
        confirm: '/api/library/orders/confirmed',
        return: '/api/library/orders/returned'
      };

      const res = await fetch(endpointMap[section], {
        method: 'GET',
        headers: {
          libId: id,
          limit: limit,
          page: currentPage
        }
      });

      if (!res.ok) {
        throw new Error(`Error fetching ${section} orders`);
      }

      const data = await res.json();

      console.log(data);
      if (section === 'prepare') setPreOrder(data.orders);
      else if (section === 'confirm') setConfOrder(data.orders);
      else if (section === 'return') setRetOrder(data.orders);

      setTotalCount(data.totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, section])

  const moreDetials = (path) => {
    router.push(path)
  }

  const confirmOrder = async (orderId) => {

    try {
      const res = await fetch('/api/library/orders/confirmed', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      })

      if (!res.ok) {
        console.error("Failed to update order status", res.statusText);
        return;
      }
      const data = await res.json();
      console.log(data.order);
    } catch (err) {
      console.log(err);
    }

    try {

    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      <div>
        <h2>Orders</h2>
        <div className='flex justify-evenly'>
          <div className=''>
            <h2 onClick={() => { setSection('prepare') }} className='cursor-pointer'>Prepare Orders</h2>
            <h2 onClick={() => { setSection('confirm') }} className='cursor-pointer'>Confirmed Orders</h2>
            <h2 onClick={() => { setSection('return') }} className='cursor-pointer'>Returned Orders</h2>
          </div>
          <div className='border-l-2'></div>
          <div className='w-[80%]'>
            <div className='ml-1'>
              {section === 'prepare' && (
                (loading) ? (
                  <div>Loading...</div>
                ) :
                  (
                    <div>
                      {preOrder.length > 0 ? (
                        preOrder.map(order => (
                          <div key={order._id} className='border-secondary border-[1px] py-2'>
                            <h3>Order ID: {order._id}</h3>
                            <div>
                              {order.books.map(book => (
                                <div key={book._id} className='flex flex-col items-center border-secondary border-[1px]'>
                                  <div>{book.title}</div>

                                </div>
                              ))}
                              <div className='flex gap-2'>
                                <button className='bg-secondary' onClick={() => { moreDetials(`/orders/${order._id}`) }}>
                                  More Details
                                </button>
                                <button className='bg-secondary' onClick={() => confirmOrder(order._id)}>
                                  confirm
                                </button>
                              </div>

                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No orders found.</p>
                      )

                      }
                    </div>
                  )
              )}
              {section === 'confirm' &&
                (
                  (loading) ? (
                    <div>Loading...</div>
                  ) :
                    (
                      <div>
                        {confOrder.length > 0 ? (
                          confOrder.map(order => (
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
                      </div>
                    )
                )
              }
              {section === 'return' &&
                (
                  (loading) ? (
                    <div>Loading...</div>
                  ) :
                    (
                      <div>
                        {retOrder.length > 0 ? (
                          retOrder.map(order => (
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
                      </div>
                    )
                )
              }
            </div>
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              limit={limit}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default orderId