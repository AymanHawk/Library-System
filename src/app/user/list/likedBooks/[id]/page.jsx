"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";
import UserNavbar from "../../../../../components/UserNavbar";

function likedBooks() {
  const { user } = useUser();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("/api/bookList/user/one", {
          method: "GET",
          headers: {
            userId: user.id,
            reqList: "likedBooks",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get read list");
        }

        const data = await response.json();
        setList(Object.values(data.list));
      } catch (err) {
        console.log(err);
      }
    };

    if (user && user.id) {
      fetchList();
    }
  }, [user]);

  return (
    <div>
      <UserNavbar />
      <div className="ml-auto mr-auto">
        <h1 className="mb-[10px] text-primary text-[43px]">Liked Books</h1>
        <div className="flex flex-row flex-wrap justify-start items-center gap-6">
          {list.map((book) => (
            <div key={book.id} className="flex flex-col ml-auto mr-auto w-[400px] h-[550px] xl:w-[350px] xl:h-[500px] lg:w-[300px] lg:h-[630px] md:w-[280px] md:h-[630px] sm:w-[200px] sm:h-[580px]">
              <Image
                src={book.imgUrl}
                alt={book.id}
                width={50}
                height={60}
                className="xl:w-[200px] xl:h-[300px] lg:w-[250px] lg:h-[350px] md:w-[250px] md:h-[350px] sm:w-[200px] w-[200px]"
              />
              <h2 className="text-primary text-[32px]">{book.title.length > 20 ? `${book.title.slice(0, 20)}...` : book.title}</h2>
              <div className="h-full"></div>
              <h3 className="text-[23px]">{book.author}</h3>
              <h3 className="text-[23px] mb-[30px]">{book.genre}</h3>
              <div className="h-full"></div>
              <button className="text-center text-[20px] bg-secondary w-full p-2">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default likedBooks;
