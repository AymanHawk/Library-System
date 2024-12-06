"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserNavbar from "../../../../components/UserNavbar";
import Pagination from "../../../browse/books/search/results/Pagination.jsx";

function orderId() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const [totalCount, setTotalCount] = useState(0);

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

      console.log(data);

      setOrders(data.orders);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />

      <div className="w-[80%] mx-auto">
        <h1 className="text-primary text-3xl text-left lg:text-4xl mb-5">
          Orders
        </h1>
        <div className="border-[1px] border-secondary border-solid rounded-lg flex flex-col px-4 py-2 gap-2 overflow-x-scroll">
          <div className="h-[20%] flex justify-between ">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <div key={order._id} className="flex flex-col">
                  <div
                    key={order._id}
                    className="text-[#D9D9D9] md:text-sm text-[10px] m-4"
                    
                  >
                    <h3>
                      Order ID: <br />{" "}
                      <span className="text-primary md:text-lg text-sm">
                        #{order._id}
                      </span>
                    </h3>
                    <div className="flex flex-row gap-4 mt-4 mb-4">
                      {order.books.map((book) => (
                        <div key={book._id} className="flex flex-row">
                          <div className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28">
                            <img src={book.imgSrc} alt="" />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-primary sm:text-lg norm:text-2xl lg:text-2xl text-nowrap text-base">
                              {book.title}
                            </div>
                            <p className="text-[#D9D9D9]] sm:text-base norm:text-lg lg:text-lg text-sm">
                              {book.author}
                            </p>
                            <div className="flex-grow"></div>
                          <button className="ml-2 mb-2 rounded-full bg-secondary sm:px-5 sm:py-2 text-nowrap sm:text-lg p-2 text-[10px] w-[60%]">
                            View Details
                          </button>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
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
  );
}

export default orderId;
