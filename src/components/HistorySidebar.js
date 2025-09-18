import React from 'react';

function HistorySidebar({ isOpen, toggleSidebar, history, loadHistoryEntry }) {
  return (
    <div className={`history-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="history-header">
        {isOpen && <h2>Query History</h2>}
        <button onClick={toggleSidebar}>
          {isOpen ? '◄' : '►'}
        </button>
      </div>
      {isOpen && (
        <div className="history-content">
          {history.length === 0 && <p>No history yet.</p>}
          {history.map((entry, index) => (
            <div key={index} className="history-entry" onClick={() => loadHistoryEntry(entry)}>
              <p className="history-query">{entry.query.slice(0, 50)}{entry.query.length > 50 ? '...' : ''}</p>
              <p className="history-timestamp">{entry.timestamp}</p>
              <a href={entry.url} className="history-url" target="_blank" rel="noopener noreferrer">Share URL</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistorySidebar;