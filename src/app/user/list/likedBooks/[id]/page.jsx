"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";
import UserNavbar from "../../../../../components/UserNavbar";

function likedBooks() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const { user } = useUser();
  const [bookList, setBookList] = useState({
    readBooks: [],
    toReadBooks: [],
    likedBooks: [],
  });

  useEffect(() => {
    const fetchBookList = async () => {
      try {
        const response = await fetch(
          `/api/bookList/user/all?userId=${user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to get book list");
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
  }, [user]);

  return (
    <div>
      <UserNavbar />
      <div className="ml-[8%]">
      <h1 className=" mb-[10px] text-primary text-[43px]">Liked Books</h1>
      <div className="flex">
        <div className="flex flex-col">
        {bookList.likedBooks.map((book) => (
          <div key={book.id} className="mb-[10px]">
            <Image
              src={book.imgUrl}
              alt={book.id}
              width={50}
              height={60}
              className="xl:w-[200px] lg:w-[250px]"
            />
          </div>
        ))}
        <h2 className="text-primary text-[32px]">One Piece</h2>
      <h3 className="text-[23px]">Eiichiro Oda</h3>
      <h3 className="mb-[15px] text-[23px]">Manga</h3>
      <button className="text-center text-[20px] bg-secondary w-full p-2">Remove</button>
      </div>
      </div>
      </div> 
    </div>
  );
}

export default likedBooks;
