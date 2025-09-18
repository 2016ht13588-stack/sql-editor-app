SQL Query Editor User Guide

Overview

The SQL Query Editor is a web-based application built with React that allows users to write and execute SQL-like queries against two predefined datasets (employee with 500 rows and users with 1000 rows). It features a tabbed interface for multiple queries, a history sidebar for tracking past queries, a filterable and paginated results table, and options to export results as CSV or to Google Sheet.


Key Features and Usage

1. Tabbed Query Editor
Purpose: Manage multiple SQL queries simultaneously.
Usage:
Add Tab: Click "+ Add Tab" in the header to create a new tab (e.g., "Query 2").
Switch Tabs: Click a tab to make it active for editing.
Close Tabs: Click the "×" on the active tab (appears if multiple tabs exist) to close it. The first tab cannot be closed.

Example: Create three tabs, write different queries (e.g., SELECT * FROM users; in Tab 1, SELECT * FROM employee; in Tab 2), and switch between them.

2. SQL Editor
Purpose: Write and execute SQL-like queries.
Usage:
Enter a query in the textarea (e.g., SELECT * FROM employee; or SELECT * FROM users;).
Click "Execute Query" to run it.
The app recognizes:
Queries with "FROM employee" (case-insensitive) load employee.json (500 rows).
Queries with "FROM users" or others load users.json (1000 rows).
Note: This is a simplified parser. Only the table name matters for data selection; other SQL syntax is ignored for now.
Example: Type SELECT name, email FROM employee WHERE department = 'HR'; → Loads all 500 employee rows (filters applied later).

3. Query History

Purpose: Track and revisit past queries with timestamps and shareable URLs.
Usage:
View History: The sidebar on the left shows up to 50 recent queries, with query text (truncated to 50 characters), timestamp, and a "Share URL" link.

Toggle Sidebar: Click "◄" to collapse or "►" to expand.
Load Query: Click a history entry to load its query into a new tab and display results.

Share URL: Click "Share URL" to open a new tab with the query and results encoded (e.g., http://localhost:3000/?query=SELECT%20*%20FROM%20employee&result=<encoded_data>).

Warning: URLs with large result sets (e.g., 1000 rows) may be long and could exceed browser limits. For production, use a backend to store results.

Example: Run SELECT * FROM users;, collapse sidebar, expand, click the history entry to reload, then click "Share URL" to test.

4. Results Table with Pagination

Purpose: Display query results with filtering and pagination.
Usage:

Display: After executing a query, results appear in a table (up to 100 rows per page).

Pagination:
Shows 100 rows per page (e.g., 5 pages for 500 employees, 10 for 1000 users).
Use "Prev" and "Next" buttons or click page numbers to navigate.

Row count shows "X of Y rows (Page Z of W)" (e.g., "100 of 500 rows (Page 1 of 5)").
Filters: Each column has a filter input. Enter text to filter rows (case-insensitive, partial match). Filtering resets to page 1.

Example: Run SELECT * FROM employee;, filter "department" to "HR" → Table shows up to 100 matching rows, with pagination for additional matches.

5. Export Options
Purpose: Export all filtered results (not just the current page) as CSV or to Google Sheets.
Usage:

Download CSV:
Click "Download CSV (All Filtered)" to download a file named query_results_YYYY-MM-DD.csv.
Includes all filtered rows (e.g., 500 for unfiltered employees).
Data is properly escaped (handles commas, quotes).



Export to Google Sheets:
Click "Export to Google Sheets (All Filtered)" to copy tab-separated values (TSV) to clipboard.
Open sheets.google.com, create a new sheet, paste (Ctrl+V), and data populates as a table.
An alert confirms the copy with instructions.

Example: Filter users by "city" to "Chicago", click "Download CSV" → Saves all matching rows. Click "Export to Google Sheets", paste in a new sheet → See filtered data.



Code Structure

Directory: src/
App.js: Main application component orchestrating UI and logic.
App.css: Styles for the main layout.
index.js: Entry point for React rendering.
index.css: Global styles for components.

Directory: src/components/
Header.js: Displays the app title and "Add Tab" button.
Tabs.js: Manages query tabs (add, switch, close).
SqlEditor.js: Provides the text area for writing SQL queries.
HistorySidebar.js: Shows query history with toggle functionality.
ResultsTable.js: Displays query results with filters, pagination, and export options.

Directory: src/hooks/
useQueryTabs.js: Manages tab state and query updates.
useQueryHistory.js: Handles query history and URL parsing.
useQueryResults.js: Manages result data, filters, and pagination.

Directory: src/data/
employee.json: Generated data for 500 employee records.
users.json: Generated data for 1000 user records.

Root Directory:
generate_data.py: Python script to create employee.json and users.json.
package.json: Defines project dependencies and scripts.