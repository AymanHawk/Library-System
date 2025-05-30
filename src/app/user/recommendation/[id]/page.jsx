"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import UserNavbar from "../../../../components/UserNavbar";
import { useUser } from "@clerk/nextjs";
import { useRouterContext } from "@/utils/RouterContext";
import Pagination from '../../../browse/books/search/results/Pagination.jsx'
import Loading from './loading.jsx'

export default function Recommendations() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [list, setList] = useState();
  const router = useRouterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const [totalCount, setTotalCount] = useState(0);
  const { user } = useUser();

  const handleRoute = (path) => {
    router.push(path);
  }
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch("/api/bookList/user/one", {
          method: "GET",
          headers: {
            userId: user.id,
            reqList: "recomendation",
            limit: limit,
            page: currentPage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get read list");
        }

        const data = await response.json();
        setList(Object.values(data.list));
        setTotalCount(data.totalCount);
      } catch (err) {
        console.log(err);
      }



    };

    if (user && user.id) {
      fetchList();
    }
  }, [user, currentPage]);


  return (
    <div>
      <UserNavbar userId={id} userPath={pathname} />
      <div className="mx-auto 2xl:w-[1400px] xl:w-[1250px] lg:w-[1000px] norm:w-[750px] md:w-[600px] sm:w-[450px] w-[330px] xs:w-[250px]">
        <div className="flex flex-wrap justify-between items-center">
          <h1 className="mb-[10px] text-primary text-[18px] sm:text-[28px] md:text-[43px]">Recommendations</h1>
          <h1 onClick={() => { handleRoute(`/user/recommendation/survey/${id}`) }} className="mb-[10px] cursor-pointer transition-transform duration-300 hover:scale-[1.01] text-primary text-[15px] sm:text-[18px] md:text-[25px]">Get New Recomendations</h1>
        </div>
        {!list ? (
          <div>
            <Loading />
          </div>
        ) : (
          list.length > 0 ? (
            <div>
              <div className="lg:ml-[20px] flex flex-row flex-wrap justify-start gap-6">
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start ">
                  {list.map((book) => (
                    <div
                      key={book.id}
                      className="transition-transform duration-300 hover:scale-[1.01] hover:bg-loading flex flex-col 2xl:w-[256px] w-[250px] h-auto xl:w-[226px] xl:h-[600px] lg:w-[220px] norm:w-[210px] lg:h-[630px] md:w-[250px] md:h-[630px] sm:w-[200px] sm:h-[580px]"
                    >
                      <img
                        src={book.imgUrl}
                        alt={book.id}
                        width={50}
                        height={60}
                        className="w-full xl:h-[350px] lg:h-[350px] md:h-[350px] h-[350px]"
                      />
                      <h2 onClick={() => handleRoute(`/books/${book.id}`)} className="text-primary cursor-pointer text-[32px]">
                        {book.title.length > 40
                          ? `${book.title.slice(0, 40)}...`
                          : book.title}
                      </h2>
                      <h3 className="text-[23px]">{book.author}</h3>
                      <h3 className="text-[23px] capitalize">{book.genre}</h3>
                    </div>
                  ))}
                </div>
              </div>
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                limit={limit}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <div className="text-xl">
              No Recomendations
            </div>
          )
        )

        }

      </div>

    </div>
  );
}

