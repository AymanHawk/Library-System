'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import UserNavbar from "../../../../components/UserNavbar";
import Image from 'next/image';


function Lists() {

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const { user } = useUser();
  const [bookList, setBookList] = useState({
    readBooks: [],
    toReadBooks: [],
    likedBooks: [],
  });

  useEffect(() => {
    const fetchBookList = async () => {
      try {
        const response = await fetch(`/api/bookList/user/all?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to get book list');
        }

        const data = await response.json();
        setBookList(data.bookList);
      } catch (err) {
        console.log(err);
      }
    };
    if (user && user.id) {
      fetchBookList();
    }
  }, [user])


  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />
      <div className='sm:mx-20 mx-5'>
        <div className=" border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <div className="flex justify-between items-center w-[99%]">
              <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
                Read Books
              </h1>
              <a href="#" className="text-white text-[10px] sm:text-sm md:text-base norm:text-lg lg:text-xl">See All</a>
            </div>
            <div className='flex'>
              {bookList.readBooks.map((book) => (
                <div key={book.id} className=''>
                  <Image src={book.imgUrl} alt={book.id} width={50} height={60} className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28" />
                </div>
              ))
              }
            </div>
          </div>
        </div>
        <div className=" border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <div className="flex justify-between items-center w-[99%]">
              <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
                Liked Books
              </h1>
              <a href="#" className="text-white text-[10px] sm:text-sm md:text-base norm:text-lg lg:text-xl">See All</a>
            </div>
            <div className='flex'>
              {bookList.readBooks.map((book) => (
                <div key={book.id} className=''>
                  <Image src={book.imgUrl} alt={book.id} width={50} height={60} className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28" />
                </div>
              ))
              }
            </div>
          </div>
        </div>
        <div className=" border-secondary rounded-md border-2 p-3 mb-10">
          <div className="flex flex-col items-start">
            <div className="flex justify-between items-center w-[99%]">
              <h1 className="text-white text-sm sm:text-base md:text-xl norm:text-2xl lg:text-3xl">
                To-Read
              </h1>
              <a href="#" className="text-white text-[10px] sm:text-sm md:text-base norm:text-lg lg:text-xl">See All</a>
            </div>
            <div className='flex'>
              {bookList.readBooks.map((book) => (
                <div key={book.id} className=''>
                  <Image src={book.imgUrl} alt={book.id} width={50} height={60} className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28" />
                </div>
              ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lists