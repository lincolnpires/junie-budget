### User stories with their respective Definitions of Done (DoD):

*   As a developer, I want to record my income so I can track my earnings.
    *   DoD:
        *   I can input the source of income.
        *   I can input the amount of income.
        *   I can input the date of income.
        *   The income is saved and displayed in a list.
*   As a developer, I want to categorize my expenses (tools, subscriptions) so I know where my money is going.
    *   DoD:
        *   I can select a category for each expense (e.g., "Tools," "Subscriptions").
        *   I can input the name of the expense.
        *   I can input the amount of the expense.
        *   I can input the date of the expense.
        *   The expense is saved and displayed in a list.
*   As a developer, I want to set a monthly budget for each expense category so I can control my spending.
    *   DoD:
        *   I can set a budget amount for each expense category.
        *   The budget is saved and associated with the correct category.
*   As a developer, I want to see my spending progress against my budget so I know if I'm on track.
    *   DoD:
        *   A progress bar or similar visual shows how much I've spent in each category compared to the budget.
        *   The progress is updated automatically when I add an expense.
*   As a developer, I want to see a simple report of my income vs. expenses so I can understand my overall financial situation.
    *   DoD:
        *   The report shows total income for the month.
        *   The report shows total expenses for the month.
        *   The report shows the difference between income and expenses.


---

### User stories broken down into tasks with technical details:

**Story 1: Record Income**

*   Tasks:
    *   Create Income Input Form (React):
        *   Fields: Source (text), Amount (number), Date (date).
        *   Tech: React useState, form elements.
    *   Create API Endpoint (Worker):
        *   Endpoint: `POST /api/income`.
        *   Tech: Cloudflare Worker, D1 database insert.
    *   Display Income List (React):
        *   Fetch data from `GET /api/income`.
        *   Tech: React useEffect, fetch API.
    *   D1 Table:
        *   Columns: id (INTEGER PRIMARY KEY), source (TEXT), amount (REAL), date (TEXT).

**Story 2: Categorize Expenses**

*   Tasks:
    *   Create Expense Input Form (React):
        *   Fields: Category (dropdown), Name (text), Amount (number), Date (date).
        *   Tech: React useState, form elements.
    *   Create API Endpoint (Worker):
        *   Endpoint: `POST /api/expenses`.
        *   Tech: Cloudflare Worker, D1 database insert.
    *   Display Expense List (React):
        *   Fetch data from `GET /api/expenses`.
        *   Tech: React useEffect, fetch API.
    *   D1 Table:
        *   Columns: id (INTEGER PRIMARY KEY), category (TEXT), name (TEXT), amount (REAL), date (TEXT).

**Story 3: Set Monthly Budget**

*   Tasks:
    *   Create Budget Input Form (React):
        *   Fields: Category (dropdown), Amount (number).
        *   Tech: React useState, form elements.
    *   Create API Endpoint (Worker):
        *   Endpoint: `POST /api/budgets`.
        *   Tech: Cloudflare Worker, D1 database insert/update.
    *   D1 Table:
        *   Columns: category (TEXT PRIMARY KEY), amount (REAL).

**Story 4: Spending Progress**

*   Tasks:
    *   Fetch Budget and Expenses (Worker):
        *   Endpoint: `GET /api/progress`.
        *   Tech: Cloudflare Worker, D1 database queries.
    *   Calculate Progress (Worker):
        *   Calculate spent amount per category.
        *   Calculate percentage of budget spent.
    *   Display Progress (React):
        *   Use progress bars or similar.
        *   Tech: React components, CSS styling.

**Story 5: Simple Report**

*   Tasks:
    *   Fetch Income and Expenses (Worker):
        *   Endpoint: `GET /api/report`.
        *   Tech: Cloudflare Worker, D1 database queries.
    *   Calculate Totals (Worker):
        *   Calculate total income.
        *   Calculate total expenses.
        *   Calculate difference.
    *   Display Report (React):
        *   Show income, expenses, and difference.
        *   Tech: React components, basic styling.
