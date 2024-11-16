// PaginationComponent.js
import React from 'react';
import { getPagination } from './pagination'; // Import the pagination logic function

const Pagination = ({ currentPage, totalCount, limit, setCurrentPage }) => {
  const totalPages = Math.ceil(totalCount / limit);
  const pagination = getPagination(currentPage, totalPages);

  return (
    <div className='flex justify-center'>
      {pagination.map((page, index) => (
        <span key={index} className='m-2 md:text-2xl text-xl text-primary'>
          {page === '...' ? (
            <span>{page}</span>
          ) : (
            <button 
              onClick={() => setCurrentPage(page)} 
              disabled={currentPage === page} 
              style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
            >
              {page}
            </button>
          )}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
