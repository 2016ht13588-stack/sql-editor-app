import React from 'react';

function SqlEditor({ query, updateQuery, executeQuery }) {
  return (
    <div className="editor-container">
      <h2>SQL Editor</h2>
      <textarea
        value={query}
        onChange={updateQuery}
        placeholder="Enter your SQL query here..."
        rows={10}
        cols={80}
        className="sql-editor"
      />
      <button onClick={executeQuery} className="execute-btn">Execute Query</button>
    </div>
  );
}

export default SqlEditor;