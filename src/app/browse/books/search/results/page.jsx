'use client'
import React, { useEffect, useRef, useState } from 'react'
import Pagination from './Pagination.jsx'
import Image from 'next/image.js';
import dropdown from '../../../../../images/dd.png'
import like from '../../../../../images/like.png'
import dislike from '../../../../../images/dislike.png'



function Results({ searchParams }) {
  const searchQuery = searchParams?.search;
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [dropState, setDropState] = useState({});
  const [dropTextState, setDropTextState] = useState({});
  const dropRefs = useRef({});

  const toggleDrop = (bookId) => {
    setDropState((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handleTextChange = (bookId, list) => {
    setDropTextState((prev) => ({
      ...prev,
      [bookId]: list,
    }));
    setDropState((prev) => ({
      ...prev,
      [bookId]: false,
    }));
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



  return (
    <div className='lg:w-[1250px] mx-auto' >
      <h2 className='text-primary text-2xl mx-5 my-2'>Results for '{searchQuery}'</h2>
      <div className='flex flex-wrap justify-evenly mx-auto'>{results.map((book) => (
        <div key={book._id} className=' w-[600px] flex my-2 hover:bg-[#181616] p-1'>
          <div className='flex items-stretch w-[180px]'>
            <img src={book.imgUrl} className='w-40' alt={book.title} />
          </div>
          <div className='flex flex-col w-[400px] justify-between ml-5'>
            <div>
              <a href={`/books/${book._id}`} className='text-primary text-3xl text-wrap'>{book.title}</a>
              <h3 className='text-primary text-xl'>{book.author}</h3>
              <h4 className='text-lg'>{book.isbn}</h4>
              <h4>{book.genre[0]}, {book.genre[1]}, {book.genre[2]}, {book.genre[(book.genre.length - 1)]}</h4>
              <h4>{book.format}</h4>
              <h4>{book.length}</h4>
            </div>
            <div className='flex'>
              <div
                ref={(el) => dropRefs.current[book._id] = el}
                onClick={() => toggleDrop(book._id)}
                className=' cursor-pointer flex justify-start items-center mb-3'
              >
                <section className='bg-secondary hover:bg-[#4f5aa3] text-white font-normal py-2 px-2 w-24 sm:w-48 h-[40px] sm:text-lg text-sm xs:w-20 xs:text-[10px] leading-none content-center text-left'>
                  {dropTextState[book._id] || 'Add to a List'}
                </section>
                <section className='bg-secondary hover:bg-[#4f5aa3] flex items-center z-20 justify-end w-[40px] h-[40px] border-l-2  py-2 '>
                  <Image src={dropdown} alt='dd' className='mx-auto relative' width={25} height={20} />
                  <section className={`bg-secondary ${dropState[book._id] ? '' : 'hidden'} z-10 absolute xs:mt-[122px] mt-[133px] sm:mt-[163px] sm:w-36 w-[90px] xs:w-16 text-center`}>
                    <ul className='text-white'>
                      <li onClick={(e) => {e.stopPropagation(); handleTextChange(book._id, 'Finished')}} className='border-y-2 hover:bg-[#4f5aa3] p-2 w-full'>Finished</li>
                      <li onClick={(e) => {e.stopPropagation(); handleTextChange(book._id, 'To-Read')}} className='border-b-2 hover:bg-[#4f5aa3] p-2 w-full'>To-Read</li>
                      <li onClick={(e) => {e.stopPropagation(); handleTextChange(book._id, 'Liked')}} className='border-b-2 hover:bg-[#4f5aa3] p-2 w-full'>Liked</li>
                    </ul>
                  </section>
                </section>
              </div>
              <div className='flex justify-start gap-2'>
                <Image src={like} alt='dd' width={45} height={45} />
                <Image src={dislike} alt='dd' width={45} height={45} />
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