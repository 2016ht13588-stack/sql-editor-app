import React from 'react';

function Header({ addTab }) {
  return (
    <header className="app-header">
      <h1>SQL Query Editor</h1>
      <button onClick={addTab}>+ Add Tab</button>
    </header>
  );
}

export default Header;