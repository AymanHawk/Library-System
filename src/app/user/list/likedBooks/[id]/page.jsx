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
      <div className="ml-[8%]">
        <h1 className="mb-[10px] text-primary text-[43px]">Liked Books</h1>
        <div className="flex flex-row  gap-6">
          {list.map((book) => (
            <div key={book.id} className="flex flex-col">
              <Image
                src={book.imgUrl}
                alt={book.id}
                width={50}
                height={60}
                className="xl:w-[200px] lg:w-[250px]"
              />
              <h2 className="text-primary text-[32px]">{book.title}</h2>
              <h3 className="text-[23px]">{book.author}</h3>
              <h3 className="text-[23px]">{book.genre}</h3>
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
