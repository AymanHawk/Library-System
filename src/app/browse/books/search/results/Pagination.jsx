// PaginationComponent.js
import React from 'react';
import { getPagination } from './pagination'; // Import the pagination logic function

const Pagination = ({ currentPage, totalCount, limit, setCurrentPage }) => {
  const totalPages = Math.ceil(totalCount / limit);
  const pagination = getPagination(currentPage, totalPages);

  return (
    <div>
      {pagination.map((page, index) => (
        <span key={index} style={{ margin: '0 5px' }}>
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
      page
    </div>
  );
};

export default Pagination;
