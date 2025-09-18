import { useState, useEffect } from 'react';

function useQueryHistory(setTabs, setActiveTabId) {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('queryHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const result = params.get('result');
    if (query && result) {
      try {
        const decodedResult = JSON.parse(decodeURIComponent(result));
        setTabs([{ id: 1, name: 'Query 1', query: decodeURIComponent(query) }]);
        setActiveTabId(1);
      } catch (e) {
        console.error('Error parsing URL params:', e);
      }
    }
  }, [setTabs, setActiveTabId]);

  useEffect(() => {
    localStorage.setItem('queryHistory', JSON.stringify(history));
  }, [history]);

  const addHistoryEntry = (entry) => {
    setHistory([entry, ...history.slice(0, 49)]);
  };

  const loadHistoryEntry = (entry) => {
    setTabs([{ id: 1, name: 'Query 1', query: entry.query }]);
    setActiveTabId(1);
    window.history.pushState({}, '', entry.url);
  };

  return { history, addHistoryEntry, loadHistoryEntry };
}

export default useQueryHistory;