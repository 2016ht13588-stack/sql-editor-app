import React from 'react';

function Tabs({ tabs, activeTabId, setActiveTabId, setTabs }) {
  return (
    <div className="tabs-container">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={activeTabId === tab.id ? 'active-tab' : 'tab'}
          onClick={() => setActiveTabId(tab.id)}
        >
          {tab.name}
          {activeTabId === tab.id && tabs.length > 1 && (
            <span
              className="close-tab"
              onClick={(e) => {
                e.stopPropagation();
                setTabs(tabs.filter(t => t.id !== tab.id));
                setActiveTabId(tabs[0].id);
              }}
            >
              ×
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default Tabs;