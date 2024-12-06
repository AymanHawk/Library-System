'use client'
import React, { useEffect, useState } from "react";
import UserNavbar from "../../../../components/UserNavbar";
import { usePathname } from 'next/navigation';
import { useRouterContext } from '../../../../utils/RouterContext'
import { useUser } from "@clerk/nextjs";

function Dashboard() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const router = useRouterContext();
  const { user } = useUser();
  const [bookList, setBookList] = useState({
    readBooks: [],
    recommendBooks: [],
    likedBooks: [],
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
      <div className="grid justify-items-center lg:mx-0 grid-cols-1 gap-6 sm:grid-cols-1 norm:grid-cols-3 lg:grid-cols-3 xl:mx-5">
        <div className="w-9/12">
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Liked
          </h1>
          <div className=" border-secondary rounded-[5px] border-2 p-2 flex flex-col ">
            <span className="cursor-pointer" onClick={() => handleRoute(`/user/list/likedBooks/${id}`)}>See All</span>
            <div className="flex flex-wrap justify-evenly gap-5 py-3">
              {bookList.likedBooks.map(book => (
                <div key={book.id} className="bg-white lg:w-[45%] xl:h-48 lg:h-40 norm:h-28 norm:w-[40%] w-[35%] md:h-60 sm:h-52 h-[150px] xs:h-24">
                  <img src={book.imgUrl} alt={book.id} width={50} height={60} className="w-fit" />
                </div>
              ))
              }
            </div>
          </div>
        </div>
        <div className="w-9/12">
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Recommendations
          </h1>
          <div className=" border-secondary rounded-[5px] border-2 p-2">
            <span className="cursor-pointer" onClick={() => handleRoute(`/user/recommendation/${id}`)}>See All</span>
            <div className="flex flex-wrap justify-evenly gap-5 py-3">
              {bookList.recommendBooks.map(book => (
                <div key={book.id} className="bg-white lg:w-[45%] xl:h-48 lg:h-40 norm:h-28 norm:w-[40%] w-[35%] md:h-60 sm:h-52 h-[150px] xs:h-24">
                  <img src={book.imgUrl} alt={book.id} width={50} height={60} className="w-fit" />
                </div>
              ))
              }
            </div>
          </div>
        </div>
        <div className="w-9/12">
          <h1 className="text-primary sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl">
            Read Recently
          </h1>
          <div className=" border-secondary rounded-[5px] border-2 p-2">
            <span className="cursor-pointer" onClick={() => handleRoute(`/user/list/readBooks/${id}`)}>See All</span>
            <div className="flex flex-wrap justify-evenly gap-5 py-3">
              {bookList.readBooks.map(book => (
                <div key={book.id} className="bg-white lg:w-[45%] xl:h-48 lg:h-40 norm:h-28 norm:w-[40%] w-[35%] md:h-60 sm:h-52 h-[150px] xs:h-24">
                  <img src={book.imgUrl} alt={book.id} width={50} height={60} className="w-fit" />
                </div>
              ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
