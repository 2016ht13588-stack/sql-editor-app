import { useState } from 'react';

function useQueryResults() {
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;

  const updateFilter = (column, value) => {
    setFilters(prev => ({ ...prev, [column]: value }));
    setCurrentPage(1); // Reset to first page on filter
  };

  const filteredResults = results.filter(row => 
    Object.entries(filters).every(([col, val]) => 
      val === '' || row[col]?.toString().toLowerCase().includes(val.toLowerCase())
    )
  );

  const paginatedResults = filteredResults.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = results.length > 0 ? Object.keys(results[0]) : [];

  const totalPages = Math.ceil(filteredResults.length / pageSize);

  return { 
    results, 
    filters, 
    setResults, 
    updateFilter, 
    paginatedResults, 
    columns, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    filteredResults  // For full export
  };
}

export default useQueryResults;