'use client'
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination.jsx'

function Results({searchParams}) {
  const searchQuery = searchParams?.search;
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=${limit}`);
        const {books, totalCount} = await res.json();
        setResults(books);
        setTotalCount(totalCount);
      } catch(err) {
        console.error(err)
      }
      
      
    };
    fetchData();
  },[searchQuery, currentPage])


  return (
    <div>{results.map((book) => (
      <p key={book._id}>{book.title}</p>
    ))}
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