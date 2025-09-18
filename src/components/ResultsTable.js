import React from 'react';

function ResultsTable({ columns, paginatedResults, filteredResults, filters, updateFilter, currentPage, totalPages, setCurrentPage }) {
  const downloadCSV = () => {
    if (filteredResults.length === 0) return;
    const headers = columns.join(',');
    const rows = filteredResults.map(row => 
      columns.map(col => `"${(row[col] || '').toString().replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    const csvContent = headers + '\n' + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `query_results_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToGoogleSheets = async () => {
    if (filteredResults.length === 0) return;
    const tsvContent = columns.join('\t') + '\n' + filteredResults.map(row => 
      columns.map(col => (row[col] || '')).join('\t')
    ).join('\n');
    try {
      await navigator.clipboard.writeText(tsvContent);
      alert('TSV data copied to clipboard! Open Google Sheets, create a new sheet, and paste (Ctrl+V) to import the data.');
    } catch (err) {
      console.error('Failed to copy: ', err);
      const textarea = document.createElement('textarea');
      textarea.value = tsvContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('TSV data copied to clipboard! Open Google Sheets, create a new sheet, and paste (Ctrl+V) to import the data.');
    }
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Query Results</h2>
        <div className="export-buttons">
          <button onClick={downloadCSV} className="export-btn csv-btn">Download CSV (All Filtered)</button>
          <button onClick={exportToGoogleSheets} className="export-btn sheets-btn">Export to Google Sheets (All Filtered)</button>
        </div>
      </div>
      <div className="filters">
        {columns.map(col => (
          <div key={col} className="filter">
            <label>{col}:</label>
            <input
              type="text"
              value={filters[col] || ''}
              onChange={(e) => updateFilter(col, e.target.value)}
              placeholder={`Filter ${col}...`}
            />
          </div>
        ))}
      </div>
      <table className="results-table">
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {paginatedResults.map((row, index) => (
            <tr key={index}>
              {columns.map(col => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="row-count">{paginatedResults.length} of {filteredResults.length} rows (Page {currentPage} of {totalPages})</p>
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ResultsTable;