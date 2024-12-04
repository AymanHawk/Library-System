"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouterContext } from "../../../../utils/RouterContext";
import LibNavbar from "../../../../components/LibNavbar";
import Pagination from "../../../browse/books/search/results/Pagination.jsx";
import dropyellow from "../../../../images/drop-yellow.png";
import nobookcover from "../../../../images/no_cover_available.png";
import Image from "next/image";

function Books() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouterContext();
  const [stock, setStock] = useState([]);
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
            className="bg-secondary cursor-pointer px-8 py-2 rounded-md "
            onClick={() => handleRouteClick(`/library/inventory/addBook/${id}`)}
          >
            Upload Single Book
          </div>
          <div
            className="bg-secondary cursor-pointer px-8 py-2 rounded-md"
            onClick={() =>
              handleRouteClick(`/library/inventory/addMultipleBook/${id}`)
            }
          >
            Upload Multiple Books
          </div>
        </div>
      </div>

      {stock.length > 0 ? (
        <div>
          <div className="flex flex-row flex-wrap mr-8 ml-8 mt-6 justify-start sm:justify-center md:justify-evenly lg:justify-start">
            {stock.map((book) => (
              <div
                key={book.id}
                className="flex flex-row w-[80%] sm:w-[400px] md:w-[360px] lg:w-[420px] sm:h-[400px] h-[250px]"
              >
                {(book.imgUrl !== 'N/A') ? (
                  <img
                    className="w-full lg:h-[350px] sm:h-[320px] h-[200px] bg-primary mr-4"
                    src={book.imgUrl}
                    alt={`${book.title} cover`}
                  />
                ) : (
                  <Image
                    className="w-full lg:h-[350px] sm:h-[320px] h-[200px] bg-primary mr-4"
                    src={nobookcover}
                    alt={`${book.title} cover`}
                  />
                )}

                <div className="flex flex-col h-[400px] w-[400px]">
                  <div className="text-primary cursor-pointer text-[22px] sm:text-[32px]">
                    {book.title}
                  </div>
                  <div className="text-primary mb-8 text-[18px] sm:text-[23px]">
                    {book.author}
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
        <div></div>
      )}
    </div>
  );
}

export default Books;
