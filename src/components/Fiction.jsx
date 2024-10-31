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
      <div className="flex flex-wrap justify-center lg:justify-start ml-auto mr-auto">
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
              className="lg:w-36 lg:h-52 md:w-32 md:h-48 sm:w-32 sm:h-48 w-28 h-40 md:m-4 m-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
