"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouterContext } from "../../../../../utils/RouterContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading.jsx'

function Checkout() {
  const { user } = useUser();
  const router = useRouterContext();
  const [groupedBooks, setGroupedBooks] = useState(null);
  const [stAdd, setStAdd] = useState("");
  const [cityAdd, setCityAdd] = useState("");
  const [stateAdd, setStateAdd] = useState("");
  const [zipAdd, setZipAdd] = useState("");

  const handleRoute = (path) => {
    router.push(path);
  }

  const getAddress = async () => {
    try {
      const res = await fetch("/api/address", {
        method: "GET",
        headers: {
          userId: user.id,
        },
      });

      if (!res.ok) {
        throw new Error("Error getting the user Address");
      }

      const data = await res.json();
      setCityAdd(data.address.city);
      setStAdd(data.address.street);
      setZipAdd(data.address.zip);
      setStateAdd(data.address.state);
    } catch (err) {
      console.log("Error getting address", err);
    }
  };

  const confirmOrder = async () => {
    try {
      const res = await fetch("/api/confirmOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          street: stAdd,
          state: stateAdd,
          city: cityAdd,
          zip: zipAdd,
          orderDetail: groupedBooks,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error("Failed to update the Address");
        toast.error('Failed to Place an Order, please try again');
      } else {
        toast.success('Order Placed!!');
        sessionStorage.removeItem("groupedBooks");
        router.push(`/user/orders/${user.id}`);
      }

    } catch (err) {
      console.log("Error getting address", err);
    }
  };

  useEffect(() => {
    const groupedBookss = JSON.parse(sessionStorage.getItem("groupedBooks"));
  
    if (!groupedBookss || Object.keys(groupedBookss).length === 0) {
      router.push(`/user/orders/cart/${user.id}`);
    } else {
      setGroupedBooks(groupedBookss);
    }
  
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("groupedBooks");
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router, user.id]);

  useEffect(() => {
    if (user && user.id) {
      getAddress();
    }
  }, [user]);
  


  return (
    <div className="flex flex-row flex-wrap justify-between m-6">
      <div className="border-secondary rounded-[5px] border-2 p-2 w-[48%] min-w-[300px] h-[600px] mb-6  overflow-y-auto no-scrollbar">
        <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2">
          Confirm Checkout
        </h1>
        <hr className="border-secondary" />
        {groupedBooks ? (
          Object.keys(groupedBooks).map((libId) => (
            <div key={libId} className="border-b-[1px] border-secondary last:border-b-0">
              <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2">
                Order Summary
              </h1>
              <h2 className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-2 mt-2 ml-4 mr-4 bg-transparent text-[15px]">
                Library: {groupedBooks[libId][0].libraryInfo.name}
              </h2>
              <h2 className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-2 mt-2 ml-4 mr-4 bg-transparent text-[15px]">
                No of Books: {groupedBooks[libId].length}
              </h2>
              <ul>
                {groupedBooks[libId].map((book) => (
                  <li
                    className="flex flex-row items-start mt-4 p-1 transition-transform duration-300 hover:scale-[1.01] hover:bg-loading"
                    key={book.bookInfo._id}
                  >
                    <div className="mr-4 ml-4 mb-4 xl:w-[180px] xl:h-[220px] lg:w-[250px] lg:h-[350px] md:w-[260px] md:h-[350px] w-[200px] h-[300px]">
                      <img src={book.bookInfo.imgUrl} alt={book.bookInfo.tite} className="w-fit h-[99%]" />
                    </div>
                    <div className="flex flex-col mr-4">
                      <h2 className="text-primary text-[32px] cursor-pointer" onClick={() => { handleRoute(`/books/${book.bookInfo._id}`) }}>
                        {book.bookInfo.title}
                      </h2>
                      <h3 className="text-white text-[22px]">
                        {book.bookInfo.author}
                      </h3>
                      <h4 className="text-white text-[22px]">
                        {book.bookInfo.genre[0]}
                      </h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>

      <div className="flex flex-col w-[48%] min-w-[300px] mb-6">
        <div className="border-secondary rounded-[5px] border-2 p-2 mb-6">
          <h1 className="text-[25px] text-primary mr-4 ml-4 mt-4 mb-2">
            Shipping Address
          </h1>
          <div>
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-2 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="Street Address"
              value={stAdd}
              onChange={(e) => {
                setStAdd(e.target.value);
              }}
            />
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-4 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="City"
              value={cityAdd}
              onChange={(e) => {
                setCityAdd(e.target.value);
              }}
            />
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-4 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="State"
              value={stateAdd}
              onChange={(e) => {
                setStateAdd(e.target.value);
              }}
            />
            <input
              className="border-primary rounded-[2px] border-[1px] p-2 w-[95%] mb-4 mt-2 ml-4 mr-4 bg-transparent text-[15px]"
              type="text"
              placeholder="Zip Code"
              value={zipAdd}
              onChange={(e) => {
                setZipAdd(e.target.value);
              }}
            />
          </div>
        </div>

        <button className="bg-primary text-2xl text-background rounded-md h-[6%] transition-transform duration-300 hover:scale-[1.01]" onClick={confirmOrder}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Checkout;
