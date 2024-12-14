"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouterContext } from "../../../../utils/RouterContext";
import LibNavbar from "../../../../components/LibNavbar";
import Pagination from "../../../browse/books/search/results/Pagination.jsx";
import dropyellow from "../../../../images/drop-yellow.png";
import nobookcover from "../../../../images/no_cover_available.png";
import Image from "next/image";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading.jsx'

function Books() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouterContext();
  const [stock, setStock] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const [totalCount, setTotalCount] = useState(0);

  const getBooks = async () => {
    try {
      const res = await fetch("/api/library/invent", {
        method: "GET",
        headers: {
          libId: id,
          limit,
          page: currentPage,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to get stock");
      }

      const data = await res.json();
      setStock(Object.values(data.stock));
      setTotalCount(data.totalCount);
    } catch (err) {
      console.log("Error getting books", err);
    }
  };

  const updateStock = async (op, bookId) => {
    try {
      const res = await fetch("/api/library/invent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          libId: id,
          bookId: bookId,
          operation: op,
        }),
      });

      if (!res.ok) {
        console.error("Failed to update the inventory", res.statusText);
        return;
      }

      const data = await res.json();
      if (!data.success) {
        console.error("API response indicates failure to update the inventory");
        toast.error('Failed to Update Stock');

      } else {
        toast.success('Stock Updated');
        setStock((prevStock) =>
          prevStock.map((book) => {
            if (book.id === bookId) {
              let newAmount = op === "+" ? book.amount + 1 : book.amount - 1;
              if (newAmount < 0) newAmount = 0;
              return { ...book, amount: newAmount };
            }
            return book;
          }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getBooks();
    }
  }, [id, currentPage]);

  const handleRouteClick = (path) => {
    router.push(path);
  };

  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      <div className="flex flex-wrap justify-between mr-8 ml-8 my-6">
        <div className="flex flex-wrap gap-2">
          <div
            className="bg-secondary cursor-pointer px-8 py-2 rounded-md transition-transform duration-300 hover:scale-[1.01]"
            onClick={() => handleRouteClick(`/library/inventory/addBook/${id}`)}
          >
            Upload Single Book
          </div>
          <div
            className="bg-secondary cursor-pointer px-8 py-2 rounded-md transition-transform duration-300 hover:scale-[1.01]"
            onClick={() =>
              handleRouteClick(`/library/inventory/addMultipleBook/${id}`)
            }
          >
            Upload Multiple Books
          </div>
        </div>
      </div>

      {stock ? (
        stock.length > 0 ? (
          <div>
            <div className="flex flex-row flex-wrap  mt-6 gap-1 justify-start sm:justify-center md:justify-evenly lg:justify-start">
              {stock.map((book) => (
                <div
                  key={book.id}
                  className="flex flex-row w-[80%] sm:w-[400px] md:w-[480px] lg:w-[416px] sm:h-[400px] h-[230px] sm:h-[350px] md:h-[400px] transition-transform duration-300 hover:scale-[1.01] hover:bg-loading p-1"
                >
                  {(book.imgUrl !== 'N/A') ? (
                    <Image
                      className="w-full lg:h-[350px] md:h-[375px] sm:h-[320px] h-[200px] mr-4"
                      src={book.imgUrl}
                      width={50}
                      height={50}
                      alt={`${book.title} cover`}
                    />
                  ) : (
                    <Image
                      className="w-full lg:h-[350px] sm:h-[320px] h-[200px] mr-2"
                      src={nobookcover}
                      width={50}
                      height={50}
                      alt={`${book.title} cover`}
                    />
                  )}

                  <div className="flex flex-col h-[350px] w-[400px]">
                    <div className="overflow-y-auto h-[175px] sm:h-[250px] md:h-[280px] lg:h-[280px]">
                      <div className="text-primary cursor-pointer text-[22px] sm:text-[32px]" onClick={()=>handleRouteClick(`/books/${book.id}`)}>
                        {book.title}
                      </div>
                      <div className="text-primary text-[18px] sm:text-[23px]">
                        {book.author}
                      </div>
                      <div className="text-white text-[18px] sm:text-[23px]">
                        {book.isbn}
                      </div>
                      <div className="text-white text-[18px] sm:text-[23px]">
                        {book.format}
                      </div>
                      <div className="text-white text-[18px] sm:text-[23px]">
                        {book.language}
                      </div>
                      <div className="text-white mb-8 text-[18px] sm:text-[23px]">
                        {book.genre}
                      </div>
                    </div>
                    
                    <div className="bg-secondary w-[90px] h-[40px] text-center py-2 flex flex-row items-center justify-between px-4 rounded-md text-[20px]">
                      <span
                        className="bg-secondary cursor-pointer"
                        onClick={() => updateStock("-", book.id)}
                      >
                        -
                      </span>
                      {book.amount}
                      <span
                        className="bg-secondary cursor-pointer"
                        onClick={() => updateStock("+", book.id)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              limit={limit}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : (
          <div>No Book In Inventory</div>
        )
      ) : (
        <Loading />
      )
      }
    </div>
  );
}

export default Books;
