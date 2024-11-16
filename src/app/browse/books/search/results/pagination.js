// pagination.js
export const getPagination = (currentPage, totalPages) => {
    const pagination = [];
    const maxPagesToShow = 3; 

    pagination.push(1);
  
    
    if (currentPage > maxPagesToShow + 1) {
      pagination.push('...');
    }
  
    for (let i = Math.max(2, currentPage - maxPagesToShow); i <= Math.min(totalPages - 1, currentPage + maxPagesToShow); i++) {
      pagination.push(i);
    }
  
    if (currentPage < totalPages - maxPagesToShow) {
      pagination.push('...');
    }
  
    if (totalPages > 1) {
      pagination.push(totalPages);
    }
  
    return pagination;
  };
  