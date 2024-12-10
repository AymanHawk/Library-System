'use client'
import React, { useEffect, useState } from "react";
import UserNavbar from "../../../../components/UserNavbar";
import { usePathname } from 'next/navigation';
import { useRouterContext } from '../../../../utils/RouterContext'
import { useUser } from "@clerk/nextjs";
import Loading from './loading.jsx'

function Dashboard() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();
  const { user } = useUser();
  const [bookList, setBookList] = useState({
    readBooks: null,
    recommendBooks: null,
    likedBooks: null,
  });

  const fetchBookList = async () => {
    try {
      const response = await fetch(`/api/dashboard`, {
        method: 'GET',
        headers: {
          'userId': user.id
        }
      });
      if (!response.ok) {
        throw new Error('Failed to get book list');
      }

      const data = await response.json();
      setBookList(data.bookList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookList();
  }, [user])

  const handleRoute = (path) => {
    router.push(path);
  }

  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />
      <div className="grid justify-items-center lg:mx-0 grid-cols-1 md:gap-0 md:grid-cols-3 lg:gap-6 sm:grid-cols-1 norm:grid-cols-3 lg:grid-cols-3 xl:mx-5">
        <div className="w-11/12">
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Liked
          </h1>
          <div className=" border-secondary rounded-[5px] border-2 p-2 flex flex-col ">
            <span className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]" onClick={() => handleRoute(`/user/list/likedBooks/${id}`)}>See All</span>
            <div >
              {!(bookList.likedBooks) ? (
                <Loading />
              ) : (
                <div>
                  {
                    bookList.likedBooks.length > 0 ? (
                      <div className="flex sm:flex md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 justify-self-center gap-2 py-3 sm:gap-5 md:gap-3 lg:gap-5">
                        {bookList.likedBooks.map(book => (
                          <div key={book.id} className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]" onClick={() => { handleRoute(`/books/${book.id}`) }}>
                            <img src={book.imgUrl} alt={book.id} width={50} height={60} className="w-[80px] sm:w-[100px] md:w-[90px] lg:w-[110px] xl:w-[120px] h-[100px] sm:h-[140px] md:h-[140px] lg:h-[160px] xl:h-[165px]" />
                          </div>
                        ))
                        }
                      </div>
                    ) : (
                      <div>
                        No Books
                      </div>
                    )
                  }
                </div>
              )
              }
            </div>
          </div>
        </div>
        <div className="w-11/12">
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Recommendations
          </h1>
          <div className=" border-secondary rounded-[5px] border-2 p-2">
            <span className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]" onClick={() => handleRoute(`/user/recommendation/${id}`)}>See All</span>
            <div >
              {!(bookList.recommendBooks) ? (
                <Loading />
              ) : (
                <div>
                  {
                    bookList.recommendBooks.length > 0 ? (
                      <div className="flex sm:flex md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 justify-self-center gap-2 py-3 sm:gap-5 md:gap-3 lg:gap-5">
                        {bookList.recommendBooks.map(book => (
                          <div key={book.id} className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]" onClick={() => { handleRoute(`/books/${book.id}`) }}>
                            <img src={book.imgUrl} alt={book.id} width={50} height={60} className="w-[80px] sm:w-[100px] md:w-[90px] lg:w-[110px] xl:w-[120px] h-[100px] sm:h-[140px] md:h-[140px] lg:h-[160px] xl:h-[165px]" />
                          </div>
                        ))
                        }
                      </div>
                    ) : (
                      <div>
                        No Books
                      </div>
                    )
                  }
                </div>
              )
              }
            </div>
          </div>
        </div>
        <div className="w-11/12">
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Read Recently
          </h1>
          <div className=" border-secondary rounded-[5px] border-2 p-2">
            <span className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]" onClick={() => handleRoute(`/user/list/readBooks/${id}`)}>See All</span>
            <div >
              {!(bookList.readBooks) ? (
                <Loading />
              ) : (
                <div>
                  {
                    bookList.readBooks.length > 0 ? (
                      <div className="flex sm:flex md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 justify-self-center gap-2 py-3 sm:gap-5 md:gap-3 lg:gap-5">
                        {bookList.readBooks.map(book => (
                          <div key={book.id} className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]" onClick={() => { handleRoute(`/books/${book.id}`) }}>
                            <img src={book.imgUrl} alt={book.id} width={50} height={60} className="w-[80px] sm:w-[100px] md:w-[90px] lg:w-[110px] xl:w-[120px] h-[100px] sm:h-[140px] md:h-[140px] lg:h-[160px] xl:h-[165px]" />
                          </div>
                        ))
                        }
                      </div>
                    ) : (
                      <div>
                        No Books
                      </div>
                    )
                  }
                </div>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
