SQL Query Editor
The SQL Query Editor is a web-based application built with React that allows users to write and execute simplified SQL-like queries against two predefined datasets (employee.json with 500 rows and users.json with 1000 rows).

It features multiple query tabs, a query history sidebar, a filterable and paginated results table, and options to export results as CSV or Google Sheets.

Key Features
Tabbed Query Editor
Purpose: Manage multiple SQL queries simultaneously.

Usage:

Add Tab: Click + Add Tab in the header.

Switch Tabs: Click a tab to make it active.

Close Tabs: Click × on the active tab (first tab cannot be closed).

Example:

Tab 1 → SELECT * FROM users;

Tab 2 → SELECT * FROM employee;

SQL Editor
Purpose: Write and execute SQL-like queries.

Usage:

Enter queries such as:

SELECT * FROM employee;

SELECT name, email FROM users;

Click Execute Query to run.

Notes:

Queries with FROM employee → load employee.json.

Queries with FROM users or others → load users.json.

SQL syntax beyond table selection is ignored (for now).

Query History
Purpose: Keep track of previously executed queries.

Usage:

View last 50 queries with timestamp.

Collapse/expand history with sidebar controls.

Click an entry to reload query in a new tab.

Share queries via a generated Share URL.

Warning: Share URLs may become very large with 1000-row results.

Results Table with Pagination
Purpose: Display and interact with query results.

Features:

Up to 100 rows per page.

Pagination controls (Prev, Next, Jump to page).

Row count displayed as X of Y rows (Page Z of W).

Column filters (case-insensitive, partial match). Filtering resets to page 1.

Example:

Run: SELECT * FROM employee;

Filter department = HR → table updates with filtered matches.

Export Options
Download CSV:

Exports all filtered rows (not just current page).

File named query_results_YYYY-MM-DD.csv.

Handles commas and quotes properly.

Export to Google Sheets:

Copies filtered data in TSV format to clipboard.

User pastes into a new Google Sheet.

Alert confirms successful export.

Project Structure
text
src/
│── App.js              # Main component
│── App.css             # App-level styles
│── index.js            # Entry point
│── index.css           # Global styles

src/components/
│── Header.js           # Application title + Add Tab button
│── Tabs.js             # Manage query tabs
│── SqlEditor.js        # SQL query editor text area
│── HistorySidebar.js   # Query history sidebar
│── ResultsTable.js     # Display query results

src/hooks/
│── useQueryTabs.js     # Manage tab state
│── useQueryHistory.js  # Manage history + URL parsing
│── useQueryResults.js  # Manage filtering + pagination

src/data/
│── employee.json       # Dataset (500 rows)
│── users.json          # Dataset (1000 rows)

Root files:
│── generate_data.py    # Script to generate JSON datasets
│── package.json        # Project dependencies and scripts
Getting Started
Install dependencies
bash
npm install
Run the application
bash
npm start
The app runs at: http://localhost:3000

Example Queries
SELECT * FROM employee; → Loads 500 employees.

SELECT * FROM users; → Loads 1000 users.

SELECT name, email FROM users; → Still loads users dataset (syntax ignored).
