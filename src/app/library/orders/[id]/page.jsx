"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouterContext } from "../../../../utils/RouterContext";
import LibNavbar from "../../../../components/LibNavbar";
import Pagination from "../../../browse/books/search/results/Pagination.jsx";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading";

function orderId() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouterContext();
  const [preOrder, setPreOrder] = useState();
  const [confOrder, setConfOrder] = useState();
  const [retOrder, setRetOrder] = useState();
  const [section, setSection] = useState("prepare");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const [totalCount, setTotalCount] = useState(0);

  const fetchOrders = async () => {
    try {
      const endpointMap = {
        prepare: "/api/library/orders/prepared",
        confirm: "/api/library/orders/confirmed",
        return: "/api/library/orders/returned",
      };

      const res = await fetch(endpointMap[section], {
        method: "GET",
        headers: {
          libId: id,
          limit: limit,
          page: currentPage,
        },
      });

      if (!res.ok) {
        throw new Error(`Error fetching ${section} orders`);
      }

      const data = await res.json();

      console.log(data);
      if (section === "prepare") setPreOrder(data.orders);
      else if (section === "confirm") setConfOrder(data.orders);
      else if (section === "return") setRetOrder(data.orders);

      setTotalCount(data.totalCount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, section]);

  const moreDetials = (path) => {
    router.push(path);
  };

  const confirmOrder = async (orderId) => {
    try {
      const res = await fetch("/api/library/orders/confirmed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        console.error("Failed to update order status");
        toast.error("Falied to fullfill the order");
        return;
      }
      const data = await res.json();
      if (data.success) {
        toast.success("Order Fullfilled Successfully!!");
        fetchOrders();
      } else {
        toast.error("Falied to fullfill the order");
      }
    } catch (err) {
      console.log(err);
      toast.error("Falied to fullfill the order");
    }
  };

  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      <div className="mt-[50px]">
        <div className="flex justify-evenly">
          <div className="h-[80vh] flex flex-col text-[13px] sm:text-[20px] md:text-[20px] lg:text-2xl justify-evenly mr-[5px] sm:mr-2">
            <h2
              onClick={() => {
                setSection("prepare");
              }}
              className={
                (section === "prepare"
                  ? "text-primary hover:text-white"
                  : "text-white hover:text-primary") + ` cursor-pointer`
              }
            >
              Prepare Orders
            </h2>
            <h2
              onClick={() => {
                setSection("confirm");
              }}
              className={
                (section === "confirm"
                  ? "text-primary hover:text-white"
                  : "text-white hover:text-primary") + ` cursor-pointer`
              }
            >
              Fullfilled Orders
            </h2>
            <h2
              onClick={() => {
                setSection("return");
              }}
              className={
                (section === "return"
                  ? "text-primary hover:text-white"
                  : "text-white hover:text-primary") + ` cursor-pointer`
              }
            >
              Returned Orders
            </h2>
          </div>
          <div className="border-l-2 mr-4 border-primary h-[450px]"></div>
          <div className="w-[80%] overflow-auto overflow-y-auto">
            <div className="">
              {section === "prepare" &&
                (!preOrder ? (
                  <Loading />
                ) : (
                  <div>
                    <div className="h-[450px] overflow-y-auto">
                      {preOrder.length > 0 ? (
                        preOrder.map((order) => (
                          <div key={order._id} className="py-2 mx-2">
                            <h3 className=" text-[15px] sm:text-xl text-primary">
                              Order #{order._id}
                            </h3>
                            <div className="border-secondary border-[1px] p-2 flex justify-between rounded-sm">
                              <div className="flex flex-col gap-1 justify-evenly">
                                {order.books.map((book) => (
                                  <div
                                    key={book._id}
                                    className="flex flex-row gap-1 transition-transform duration-300 hover:scale-[1.01] hover:bg-loading p-2"
                                  >
                                    <div className="hidden sm:block">
                                      <Image
                                        src={book.imgSrc}
                                        width={75}
                                        height={150}
                                        alt="book.title"
                                      />
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <h2
                                        className="text-primary text-lg cursor-pointer"
                                        onClick={() => {
                                          router.push(`/books/${book._id}`);
                                        }}
                                      >
                                        {book.title}
                                      </h2>
                                      <h2 className="text-primary">
                                        {book.author}
                                      </h2>
                                      {book.isbn && <h2>ISBN #{book.isbn}</h2>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="flex flex-col justify-end gap-2 hidden md:block">
                                <button
                                  className="bg-secondary md:text-[15px] lg:text-[15px] min-w-[108px] md:w-[108px] lg:w-[108px] px-3 py-1 rounded-md transition-transform duration-300 hover:scale-[1.01]"
                                  onClick={() => {
                                    moreDetials(`/orders/${order._id}`);
                                  }}
                                >
                                  More Details
                                </button>
                                <button
                                  className="bg-secondary md:text-[15px] lg:text-[15px] min-w-[108px] md:w-[108px] lg:w-[108px] px-3 py-1 rounded-md transition-transform duration-300 hover:scale-[1.01]"
                                  onClick={() => confirmOrder(order._id)}
                                >
                                  Fullfill
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col justify-start gap-2 block md:hidden">
                              <button
                                className="bg-secondary w-[108px] mt-[5px] px-3 py-1 rounded-md transition-transform duration-300 hover:scale-[1.01]"
                                onClick={() => {
                                  moreDetials(`/orders/${order._id}`);
                                }}
                              >
                                More Details
                              </button>
                              <button
                                  className="bg-secondary w-[108px] mt-[2px] px-3 py-1 rounded-md transition-transform duration-300 hover:scale-[1.01] md:hidden"
                                  onClick={() => confirmOrder(order._id)}
                                >
                                  Fullfill
                                </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No orders found.</p>
                      )}
                      <Pagination
                        currentPage={currentPage}
                        totalCount={totalCount}
                        limit={limit}
                        setCurrentPage={setCurrentPage}
                      />
                    </div>
                  </div>
                ))}
              {section === "confirm" &&
                (!confOrder ? (
                  <Loading />
                ) : (
                  <div>
                    <div className="h-[450px] overflow-y-auto">
                      {confOrder.length > 0 ? (
                        confOrder.map((order) => (
                          <div key={order._id} className="py-2 mx-2">
                            <h3 className="text-[15px] sm:text-xl text-primary">
                              Order #{order._id}
                            </h3>
                            <div className="border-secondary border-[1px] p-2 flex justify-between rounded-sm">
                              <div className="flex flex-col gap-1 justify-evenly">
                                {order.books.map((book) => (
                                  <div
                                    key={book._id}
                                    className="flex flex-row gap-1 transition-transform duration-300 hover:scale-[1.01] hover:bg-loading p-2"
                                  >
                                    <div className="hidden sm:block">
                                      <Image
                                        src={book.imgSrc}
                                        width={75}
                                        height={150}
                                        alt="book.title"
                                      />
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <h2
                                        className="text-primary text-lg cursor-pointer"
                                        onClick={() => {
                                          router.push(`/books/${book._id}`);
                                        }}
                                      >
                                        {book.title}
                                      </h2>
                                      <h2 className="text-primary">
                                        {book.author}
                                      </h2>
                                      {book.isbn && <h2>ISBN #{book.isbn}</h2>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex flex-col justify-start gap-2 hidden md:block">
                                <button
                                  className="bg-secondary md:text-[15px] lg:text-[15px] min-w-[108px] md:w-[108px] lg:w-[108px] px-3 py-1 rounded-md transition-transform duration-300 hover:scale-[1.01]"
                                  onClick={() => {
                                    moreDetials(`/orders/${order._id}`);
                                  }}
                                >
                                  More Details
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col justify-start gap-2 block md:hidden">
                              <button
                                className="bg-secondary w-[108px] mt-[5px] px-3 py-1 rounded-md transition-transform duration-300 hover:scale-[1.01]"
                                onClick={() => {
                                  moreDetials(`/orders/${order._id}`);
                                }}
                              >
                                More Details
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No orders found.</p>
                      )}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalCount={totalCount}
                      limit={limit}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                ))}
              {section === "return" &&
                (!retOrder ? (
                  <Loading />
                ) : (
                  <div>
                    <div className="h-[450px] overflow-y-auto">
                      {retOrder.length > 0 ? (
                        retOrder.map((order) => (
                          <div key={order._id} className="py-2 mx-2">
                            <h3 className=" text-[15px] sm:text-xl text-primary">
                              Order #{order._id}
                            </h3>
                            <div className="border-secondary border-[1px] p-2 flex justify-between rounded-sm">
                              <div className="flex flex-col gap-1 justify-evenly">
                                {order.books.map((book) => (
                                  <div
                                    key={book._id}
                                    className="flex flex-row gap-1 transition-transform duration-300 hover:scale-[1.01] hover:bg-loading p-2"
                                  >
                                    <div className="hidden sm:block">
                                      <Image
                                        src={book.imgSrc}
                                        width={75}
                                        height={150}
                                        alt="book.title"
                                      />
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <h2
                                        className="text-primary text-lg cursor-pointer"
                                        onClick={() => {
                                          router.push(`/books/${book._id}`);
                                        }}
                                      >
                                        {book.title}
                                      </h2>
                                      <h2 className="text-primary">
                                        {book.author}
                                      </h2>
                                      {book.isbn && <h2>ISBN #{book.isbn}</h2>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex flex-col justify-start gap-2 hidden md:block">
                                <button
                                  className="bg-secondary md:text-[15px] lg:text-[15px] min-w-[108px] md:w-[108px] lg:w-[108px] px-3 py-1 rounded-md transition-transform duration-300 hover:scale-[1.01]"
                                  onClick={() => {
                                    moreDetials(`/orders/${order._id}`);
                                  }}
                                >
                                  More Details
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col justify-start gap-2 block md:hidden">
                              <button
                                className="bg-secondary w-[108px] mt-[5px] px-3 py-1 rounded-md transition-transform duration-300 hover:scale-[1.01]"
                                onClick={() => {
                                  moreDetials(`/orders/${order._id}`);
                                }}
                              >
                                More Details
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No orders found.</p>
                      )}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalCount={totalCount}
                      limit={limit}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default orderId;
