import { useEffect, useState } from "react";
import { useRouterContext } from "../utils/RouterContext";

export default function Home() {
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
      <h1 className="ml-[10%] mt-[4%] mb-[2%] sm:mt-[2%] text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
        Popular Books
      </h1>
      <div className="flex justify-between overflow-x-auto no-scrollbar mr-[10%] ml-[9%] w-[80%] sm:mr-auto sm:ml-auto">
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
              className="lg:w-36 lg:h-52 md:w-32 md:h-48 sm:w-32 sm:h-48 w-28 h-40 m-2"
            />
          </div>
        ))}
      </div>
      <div>
        <h1 className="ml-[10%] mt-[4%] mb-[2%] sm:mt-[2%] text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
        Liked Books
        </h1>
        <div className="flex justify-between overflow-x-auto no-scrollbar mr-[10%] ml-[9%] w-[80%] sm:mr-auto sm:ml-auto">
          {likedBooks.map((book) => (
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
                className="lg:w-36 lg:h-52 md:w-32 md:h-48 sm:w-32 sm:h-48 w-28 h-40 m-2"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="ml-[10%] mt-[4%] mb-[2%] sm:mt-[2%] text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">Most Rented Books</h1>
        <div className="flex justify-between overflow-x-auto no-scrollbar mr-[10%] ml-[9%] w-[80%] sm:mr-auto sm:ml-auto">
          {rentedBooks.map((book) => (
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
                className="lg:w-36 lg:h-52 md:w-32 md:h-48 sm:w-32 sm:h-48 w-28 h-40 m-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
