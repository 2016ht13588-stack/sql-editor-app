import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Tabs from './components/Tabs';
import SqlEditor from './components/SqlEditor';
import HistorySidebar from './components/HistorySidebar';
import ResultsTable from './components/ResultsTable';
import useQueryTabs from './hooks/useQueryTabs';
import useQueryHistory from './hooks/useQueryHistory';
import useQueryResults from './hooks/useQueryResults';
import employeeData from './data/employee.json';
import usersData from './data/users.json';

function App() {
  const { tabs, activeTabId, addTab, setActiveTabId, updateQuery, setTabs } = useQueryTabs();
  const { history, addHistoryEntry, loadHistoryEntry } = useQueryHistory(setTabs, setActiveTabId);
  const { results, filters, setResults, updateFilter, paginatedResults, columns, currentPage, setCurrentPage, totalPages, filteredResults } = useQueryResults();
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  const executeQuery = () => {
    const query = tabs.find(tab => tab.id === activeTabId)?.query || '';
    const lowerQuery = query.toLowerCase();
    const result = lowerQuery.includes('from employee') ? employeeData : usersData; // Simple parsing
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const url = `${window.location.origin}?query=${encodeURIComponent(query)}&result=${encodeURIComponent(JSON.stringify(result))}`;
    
    setResults(result);
    setCurrentPage(1); // Reset to first page
    addHistoryEntry({ query, timestamp, result, url });
  };

  return (
    <div className="App">
      <div className="main-container">
        <HistorySidebar
          isOpen={isHistoryOpen}
          toggleSidebar={() => setIsHistoryOpen(!isHistoryOpen)}
          history={history}
          loadHistoryEntry={loadHistoryEntry}
        />
        <div className="content">
          <Header addTab={addTab} />
          <Tabs
            tabs={tabs}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
            setTabs={setTabs}
          />
          <SqlEditor
            query={tabs.find(tab => tab.id === activeTabId)?.query || ''}
            updateQuery={updateQuery}
            executeQuery={executeQuery}
          />
          {results.length > 0 && (
            <ResultsTable
              columns={columns}
              paginatedResults={paginatedResults}
              filteredResults={filteredResults}
              filters={filters}
              updateFilter={updateFilter}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;