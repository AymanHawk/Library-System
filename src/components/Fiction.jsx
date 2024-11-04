import { useEffect, useState } from "react";
import { useRouterContext } from "../utils/RouterContext";

export default function Fiction() {
  const [readBooks, setReadBooks] = useState([]);
  const [rentedBooks, setRentedBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const router = useRouterContext();

  const handleBookClick = (path) => {
    router.push(path);
  };

  const getBooks = async () => {
    try {
      const response = await fetch("/api/browse/home", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to get the book data");
      }
      const data = await response.json();
      setLikedBooks(data.likedBooks);
      setReadBooks(data.readBooks);
      setRentedBooks(data.rentedBooks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <h1 className="ml-[10%] mt-[4%] sm:mt-[2%] text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
        Fiction
      </h1>
      <div className="flex flex-wrap justify-center lg:justify-start sm:ml-[8%] sm:mr-[8%] ml-[4%] mr-[4%]">
        {readBooks.map((book) => (
          <div
            onClick={() => handleBookClick(`/books/${book._id}`)}
            key={book._id}
            className="cursor-pointer flex-shrink-0"
          >
            <img
              src={book.imgUrl}
              alt={book._id}
              width={50}
              height={60}
              className="lg:w-36 lg:h-52 md:w-32 md:h-48 sm:w-32 sm:h-48 w-40 h-60 md:m-4 m-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
