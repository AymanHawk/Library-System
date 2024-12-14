"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserNavbar from "../../../../components/UserNavbar";
import Pagination from "../../../browse/books/search/results/Pagination.jsx";
import { useRouterContext } from "@/utils/RouterContext";
import Loading from './loading.jsx'

function orderId() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouterContext();
  const [orders, setOrders] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const [totalCount, setTotalCount] = useState(0);


  const handleRoute = (path) => {
    router.push(path);
  }

  const getOrders = async () => {
    try {
      const res = await fetch("/api/user/orders", {
        method: "GET",
        headers: {
          userId: id,
          limit: limit,
          page: currentPage,
        },
      });

      if (!res.ok) {
        throw new Error(`Error fetching orders`);
      }

      const data = await res.json();

      setOrders(data.orders);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, [id]);

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />

      <div className="mx-[13px] sm:m-[20px] md:mx-[80px] xl:mx-[80px]">
        <h1 className="text-primary text-xl sm:text-3xl text-left lg:text-4xl mb-5">
          Orders
        </h1>
        {orders ? (
          <div>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order._id} className="border-[1px] w-[99%] border-secondary border-solid rounded-lg flex flex-col px-4 mb-2 py-2 gap-2">
                  <div className="h-[20%] flex justify-between w-[99%]">
                    <div className="flex flex-col w-[99%]">
                      <div
                        className="text-[#D9D9D9] md:text-sm text-[10px] mt-4 mr-4 ml-4"
                      >
                        <div className="flex flex-wrap justify-between items-center text-xl">
                          <h3>
                            Order ID: <br />{" "}
                            <span className="text-primary text-xl">
                              #{order._id}
                            </span>
                          </h3>
                          <h3 className="text-xl">
                            Estimated Delivery Date:
                            <span className="text-primary md:text-lg text-sm">
                              {new Date(order.deliveryDate).toLocaleDateString('en-US')}
                            </span>

                          </h3>
                        </div>


                        <div className="flex flex-row gap-4 mt-4 mb-4 p-0.5 overflow-x-auto no-scrollbar h-[260px] mb-2">
                          {order.books.map((book) => (
                            <div key={book._id} className="flex flex-row transition-transform duration-300 hover:scale-[1.01] hover:bg-loading p-2">
                              <div className="lg:w-40 lg:h-48  md:w-40 md:h-48 sm:w-40 sm:h-48 w-[150px] mr-2">
                                <img src={book.imgSrc} alt="" />
                              </div>
                              <div className="flex flex-col">
                                <div className="text-primary sm:text-lg md:text-2xl norm:text-2xl cursor-pointer lg:text-2xl text-2xl" onClick={() => { handleRoute(`/books/${book._id}`) }}>
                                  {book.title}
                                </div>
                                <p className="text-[#D9D9D9]] sm:text-base md:text-lg norm:text-lg lg:text-lg text-xl">
                                  {book.author}
                                </p>
                                <div className="flex-grow"></div>
                              </div>

                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => { handleRoute(`/orders/${order._id}`) }} className="ml-2 mb-2 rounded-full bg-secondary sm:px-5 sm:py-2 text-nowrap text-lg p-2 w-[130px] md:w-[180px] transition-transform duration-300 hover:scale-[1.01]">
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <div>
                No Orders
              </div>
            )

            }
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              limit={limit}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>

    </div>
  );
}

export default orderId;
