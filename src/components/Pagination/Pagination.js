import { useState, useEffect } from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    const generatePages = () => {
      const pagesAroundCurrent = 2;
  
      const pages = [];
  
      pages.push(1);
  
      if (currentPage - pagesAroundCurrent > 1) {
        pages.push('...');
      }
  
      for (let i = currentPage - pagesAroundCurrent; i <= currentPage + pagesAroundCurrent; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }
  
      if (currentPage + pagesAroundCurrent < totalPages - 1) {
        pages.push('...');
      }
  
      pages.push(totalPages);
  
      setVisiblePages(pages);
    };

    generatePages();
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    onPageChange(page);
  };

  return (
    <nav className="pagination">
      <ul className="pagination__container">
        <li>
          <button className='pagination__button' onClick={() => goToPage(currentPage - 1)} aria-label="Previous" disabled={currentPage === 1}>
            <span aria-hidden="true">«</span>
          </button>
        </li>
        {visiblePages.map((page, index) => (
          <li key={index}>
            {page !== '...' ? (
              <button className={page === currentPage ? 'pagination__button_active' : 'pagination__button'} onClick={() => goToPage(page)}>{page}</button>
            ) : (
              <button className='pagination__button' aria-hidden="true" disabled>...</button>
            )}
          </li>
        ))}
        <li>
          <button className='pagination__button' onClick={() => goToPage(currentPage + 1)} aria-label="Next" disabled={currentPage === totalPages}>
            <span aria-hidden="true">»</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;