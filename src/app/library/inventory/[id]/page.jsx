'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouterContext } from '../../../../utils/RouterContext';
import LibNavbar from '../../../../components/LibNavbar';
import Pagination from '../../../browse/books/search/results/Pagination.jsx'

function Books() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
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
  }

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
  }

  useEffect(() => {
    if (id) {
      getBooks();
    }
  }, [id, currentPage])

  const handleRouteClick = (path) => {
    router.push(path);
  }

  return (
    <div>
      <LibNavbar libId={id} libPath={pathname} />
      <div>
        Search bar
      </div>
      <div className='flex justify-between'>
        <div className='border-primary border-[1px] cursor-pointer rounded-md'>
          Filter
        </div>
        <div className='flex gap-2'>
          <div className='bg-secondary cursor-pointer px-8 py-2 rounded-md' onClick={() => handleRouteClick(`/library/inventory/addBook/${id}`)}>
            Upload Single Book
          </div>
          <div className='bg-secondary cursor-pointer px-8 py-2 rounded-md' onClick={() => handleRouteClick(`/library/inventory/addMultipleBook/${id}`)}>
            Upload Multiple Books
          </div>
        </div>
      </div>
      <div>
        {stock.length > 0 ? (
          <div>
            {stock.map(book => (
              <div key={book.id}>
                <div>
                  {book.title}
                </div>
                <div>
                  <span className='bg-secondary cursor-pointer' onClick={() => updateStock('-', book.id)}>-</span>
                  {book.amount}
                  <span className='bg-secondary cursor-pointer' onClick={() => updateStock('+', book.id)}>+</span>

                </div>

              </div>
            ))}
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              limit={limit}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : (
          <div></div>
        )

        }
      </div>
    </div>
  )
}

export default Books