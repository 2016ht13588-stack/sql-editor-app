import { useState } from 'react';

function useQueryTabs() {
  const [tabs, setTabs] = useState([{ id: 1, name: 'Query 1', query: 'SELECT * FROM users;' }]);
  const [activeTabId, setActiveTabId] = useState(1);

  const addTab = () => {
    const newId = Math.max(...tabs.map(t => t.id)) + 1;
    setTabs([...tabs, { id: newId, name: `Query ${newId}`, query: '' }]);
    setActiveTabId(newId);
  };

  const updateQuery = (e) => {
    setTabs(tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, query: e.target.value } : tab
    ));
  };

  return { tabs, activeTabId, addTab, setActiveTabId, updateQuery, setTabs };
}

export default useQueryTabs;