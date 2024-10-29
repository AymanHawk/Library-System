import {useEffect, useState} from "react";

export default function Home() {

  const [readBooks, setReadBooks] = useState([]);
  const [rentedBooks, setRentedBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await fetch('/api/browse/home', 
        {
          method: 'GET'
        }
      )
      if(!response.ok) {
        throw new Error('Failed to get the book data');
      }
      const data = await response.json();
      setLikedBooks(data.likedBooks);
      setReadBooks(data.readBooks);
      setRentedBooks(data.rentedBooks);

    }catch (err) {
      console.log(err);
    }
  }

  useEffect(()=> {
    getBooks();
  }, [])

  return (
    <div>
      <h1 className="ml-[10%] mt-[5%]">
      Popular Books
        <div className="flex">
          {readBooks.map((book) => (
                <div onClick={()=>handleBookClick(`/books/${book.id}`)} key={book.id} className='cursor-pointer flex-shrink-0'>
                  <img src={book.imgUrl} alt={book.id} width={50} height={60} className="lg:w-32 lg:h-48 norm:w-28 norm:h-44 md:w-24 md:h-40 sm:w-20 sm:h-32 w-16 h-28 m-2" />
                </div>
              ))
              }
        </div>
        <div>
          Liked Books
        </div>
        <div>
          Most Rented Books
        </div>
      </h1>
    </div>
  );
}
