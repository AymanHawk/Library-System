'use client'
import React, { useEffect, useRef, useState } from 'react'
import Pagination from './Pagination.jsx'
import Image from 'next/image.js';
import dropdown from '../../../../../images/dd.png'
import like from '../../../../../images/like.png'
import dislike from '../../../../../images/dislike.png'
import activeLike from '../../../../../images/like_active.png'
import activeDislike from '../../../../../images/dislike_active.png'
import { useUser } from '@clerk/nextjs';



function Results({ searchParams }) {
  const searchQuery = searchParams?.search;
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [dropState, setDropState] = useState({});
  const [dropTextState, setDropTextState] = useState({});
  const { user } = useUser();
  const [userBookLists, setUserBookLists] = useState({
    readBooks: [],
    toReadBooks: [],
  })
  const dropRefs = useRef({});
  const [likePref, setLikePref] = useState({});
  const [userLikePref, setUserLikePref] = useState({
    likedBooks: [],
    dislikedBooks: [],
  })

  const toggleLike = async (bookId) => {

    try {
      const updatedPref = likePref[bookId] === 'like' ? null : 'like';
      setLikePref((prev) => ({
        ...prev,
        [bookId]: updatedPref,
      }))

      const res = await fetch('/api/bookList/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          bookId,
          prefList: 'likedBooks'
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error('Failed to update like status');
      }
    } catch (err) {
      console.error('Error liking the book:', err);
    }




  };

  const toggleDislike = async (bookId) => {
    try {
      const updatedPref = likePref[bookId] === 'dislike' ? null : 'dislike';
      setLikePref((prev) => ({
        ...prev,
        [bookId]: updatedPref,
      }))

      const res = await fetch('/api/bookList/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          bookId,
          prefList: 'dislikedBooks'
        }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error('Failed to update dislike status');
      }
    } catch (err) {
      console.error('Error disliking the book:', err);
    }
  };


  const toggleDrop = (bookId) => {
    setDropState((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handleTextChange = async (bookId, list) => {
    try {
      const userId = user.id;
      let newList;
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }
      if (list === 'Finished') { newList = 'readBooks' }
      else if (list === 'To-Read') { newList = 'toReadBooks' }


      const res = await fetch('/api/bookList/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bookId, newList }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        setDropTextState((prev) => ({
          ...prev,
          [bookId]: list,
        }));
        setUserBookLists(data.bookList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOutside = (event) => {
    const isOuside = Object.keys(dropRefs.current).every(
      (key) => !dropRefs.current[key]?.contains(event.target)
    );
    if (isOuside) {
      setDropState({});
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=${limit}`);
        const { books, totalCount } = await res.json();
        setResults(books);
        setTotalCount(totalCount);
      } catch (err) {
        console.error(err)
      }


    };
    fetchData();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [searchQuery, currentPage])

  useEffect(() => {
    const fetchUserBookLists = async () => {
      try {
        const userId = user.id;
        if (!userId || !user) {
          console.error("User ID is undefined");
          return;
        }
        const res = await fetch(`/api/bookList/read?userId=${userId}`);
        const data = await res.json();
        const { readBooks, toReadBooks, likedBooks, dislikedBooks } = data;
        setUserBookLists({ readBooks, toReadBooks });
        setUserLikePref({ likedBooks, dislikedBooks });
        const updatedDropTextState = {};
        const updatedUserPref = {};
        [...readBooks, ...toReadBooks].forEach((bookId) => {
          if (readBooks.includes(bookId)) {
            updatedDropTextState[bookId] = 'Finished';
          } else if (toReadBooks.includes(bookId)) {
            updatedDropTextState[bookId] = 'To-Read';
          }
        });

        [...likedBooks, ...dislikedBooks].forEach((bookId) => {
          if (likedBooks.includes(bookId)) {
            updatedUserPref[bookId] = 'like';
          } else if (dislikedBooks.includes(bookId)) {
            updatedUserPref[bookId] = 'dislike';
          }
        })
        setDropTextState(updatedDropTextState);
        setLikePref(updatedUserPref);
      } catch (err) {
        console.error(err);
      }
    };
    if (user && user.id) {
      fetchUserBookLists();
    }

  }, [user])



  return (
    <div className='2xl:w-[1300px] xl:w-[1200px] lg:w-[1000px] norm:w-[750px] md:w-[600px] sm:w-[450px] w-[340px] xs:w-[275px] mx-auto' >
      <h2 className='text-primary 2xl:text-3xl xl:text-2xl lg:text-2xl norm:text-3xl md:text-2xl sm:text-xl my-2 md:my-10 ml-5'>Results for '{searchQuery}'</h2>
      <div className='flex flex-wrap lg:justify-between justify-center'>
        {results.map((book) => (
          <div key={book._id} className='flex 2xl:w-[650px] xl:w-[600px] lg:w-[500px] norm:w-[725px] md:w-[600px] sm:w-[450px] w-[340px] xs:w-[275px] 2xl:h-[300px] xl:h-[275px] lg:h-[225px] norm:h-[325px] md:h-[275px] sm:h-[200px]  h-[175px] xs:h-[150px] my-3'>
            <div className='flex items-stretch 2xl:w-[225px] xl:w-[200px] lg:w-[175px] norm:w-[225px] md:w-[200px] sm:w-[150px] w-[110px] xs:w-[80px]'>
              <img src={book.imgUrl} className='px-2 xs:px-0.5 w-full' alt={book.title} />
            </div>
            <div className='flex 2xl:w-[425px] xl:w-[400px] lg:w-[325px] norm:w-[500px] md:w-[400px] sm:w-[300px] w-[230px] xs:w-[215px] flex-col justify-between'>
              <div className='2xl:h-[250px] xl:h-[225px] lg:h-[180px] norm:h-[275px] md:h-[225px] sm:h-[165px] h-[150px] xs:h-[100px]'>
                <a href={`/books/${book._id}`} className='text-primary text-wrap 2xl:text-4xl xl:text-3xl lg:text-xl norm:text-4xl md:text-3xl sm:text-lg text-base xs:text-sm'>{
                  book.title.length > 40 ? `${book.title.slice(0, 40)}...` : book.title
                }</a>
                <h3 className='text-primary 2xl:text-2xl xl:text-2xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px]'>{book.author}</h3>
                <h4 className='2xl:text-xl xl:text-lg lg:text-base norm:text-xl md:text-lg sm:text-sm text-[12px] xs:text-[10px]'>{book.isbn}</h4>
                <h4 className='2xl:text-xl xl:text-lg lg:text-base norm:text-xl md:text-lg sm:text-sm text-[12px] xs:text-[10px] capitalize'>{book.genre[0]}, {book.genre[1]}, {book.genre[2]}, {book.genre[(book.genre.length - 1)]}</h4>
                <h4 className='2xl:text-xl xl:text-lg lg:text-base norm:text-xl md:text-lg sm:text-sm text-[12px] xs:text-[10px] capitalize'>{book.format}</h4>
                <h4 className='2xl:text-xl xl:text-lg lg:text-base norm:text-xl md:text-lg sm:text-sm text-[12px] xs:text-[10px]'>{book.length}</h4>
              </div>
              <div className='flex 2xl:h-[50px] xl:h-[50px] lg:h-[45px] norm:h-[50px] md:h-[50px] sm:h-[35px] h-[25px] xs:h-[25px] justify-between 2xl:gap-2'>
                <div
                  ref={(el) => dropRefs.current[book._id] = el}
                  onClick={() => toggleDrop(book._id)}
                  className=' cursor-pointer flex justify-start items-center h-full 2xl:w-[250px] xl:w-[225px] lg:w-[175px] norm:w-[250px] md:w-[225px] sm:w-[175px] w-[130px] xs:w-[115px]'
                >
                  <section className='bg-secondary hover:bg-[#4f5aa3] text-white h-full 2xl:w-[175px] xl:w-[150px] lg:w-[125px] norm:w-[200px] md:w-[150px] sm:w-[140px] w-[105px] xs:w-[90px] 2xl:text-2xl xl:text-xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px] text-center  content-center'>
                    {dropTextState[book._id] || 'Add to a List'}
                  </section>
                  <section className='bg-secondary hover:bg-[#4f5aa3] flex items-center justify-end h-full 2xl:w-[50px] xl:w-[50px] lg:w-[45px] norm:w-[50px] md:w-[50px] sm:w-[35px] w-[25px] xs:w-[25px] border-l-2'>
                    <Image src={dropdown} alt='dd' className='mx-auto relative' width={25} height={20} />
                    <section className={`bg-secondary ${dropState[book._id] ? '' : 'hidden'} absolute 2xl:w-[150px] xl:w-[125px] lg:w-[100px] norm:w-[175px] md:w-[125px] sm:w-[110px] 2xl:mt-[148px] xl:mt-[140px] lg:mt-[134px] norm:mt-[147px] md:mt-[140px] sm:mt-[116px] mt-[99px] xs:mt-[99px]`}>
                      <ul className='text-white text-center'>
                        <li onClick={(e) => { e.stopPropagation(); handleTextChange(book._id, 'Finished') }} className={dropTextState[book._id] === 'Finished' ? `hidden` : `` + ` border-y-2 hover:bg-[#4f5aa3] 2xl:text-2xl xl:text-xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px] p-2 w-full`}>Finished</li>
                        <li onClick={(e) => { e.stopPropagation(); handleTextChange(book._id, 'To-Read') }} className={dropTextState[book._id] === 'To-Read' ? `hidden` : `` + ` border-b-2 hover:bg-[#4f5aa3] 2xl:text-2xl xl:text-xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px] p-2 w-full`}>To-Read</li>
                        <li onClick={(e) => { e.stopPropagation(); handleTextChange(book._id, 'Add to List') }} className={(dropTextState[book._id] === 'Finished' || dropTextState[book._id] === 'To-Read') ? ` ` : `hidden` + ` border-b-2 hover:bg-[#4f5aa3] 2xl:text-2xl xl:text-xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px] p-2 w-full`}>Remove</li>
                        {/* <li onClick={(e) => { e.stopPropagation(); handleTextChange(book._id, 'Finished') }} className='border-y-2 hover:bg-[#4f5aa3] 2xl:text-2xl xl:text-xl lg:text-lg norm:text-2xl md:text-xl sm:text-base text-sm xs:text-[12px] p-2 w-full'>Finished</li>
                        <li onClick={(e) => { e.stopPropagation(); handleTextChange(book._id, 'To-Read') }} className='border-b-2 hover:bg-[#4f5aa3] 2xl:text-2xl xl:text-xl lg:text-lg  norm:text-2xl md:text-xl text-sm xs:text-[12px] p-2 w-full'>To-Read</li> */}
                      </ul>
                    </section>
                  </section>
                </div>
                <div className='flex justify-start 2xl:w-[175px] xl:w-[150px] lg:w-[125px] norm:w-[200px] md:w-[150px] sm:w-[100px] w-[90px] xs:w-[80px] gap-2'>
                  <div onClick={() => toggleLike(book._id)}>
                    {
                      likePref[book._id] === 'like' ?
                        <Image src={activeLike} alt='like active' width={45} height={45} className='md:h-[45px] sm:w-[35px] w-[25px] xs:w-[25px]' />
                        :
                        <Image src={like} alt='active' width={45} height={45} className='md:h-[45px] sm:w-[35px] w-[25px] xs:w-[25px]' />

                    }
                  </div>
                  <div onClick={() => toggleDislike(book._id)}>
                    {
                      likePref[book._id] === 'dislike' ?
                        <Image src={activeDislike} alt='active Dislike' width={45} height={45} className='md:h-[45px] sm:w-[35px] w-[25px] xs:w-[25px]' />
                        :
                        <Image src={dislike} alt='dislike' width={45} height={45} className='md:h-[45px] sm:w-[35px] w-[25px] xs:w-[25px]' />

                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        limit={limit}
        setCurrentPage={setCurrentPage}
      />
    </div>

  )
}

export default Results