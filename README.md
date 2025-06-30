# ✅ Task Management App – Checkbox Take-Home Submission

Hi Checkbox team 👋

Thank you for the opportunity to complete this take-home task.  
This repository showcases a simple yet scalable implementation of a task management system, focusing on **clarity, performance, and production-readiness**.

---

## 🎯 Features Implemented

### Core Features
- Create new tasks with name, description, and due date
- View all tasks in a paginated, sortable list with:
  - Name, Description, Due Date, Create Date
  - Status badge: Not Urgent / Due Soon / Overdue
- Edit tasks via a modal form
- Real-time debounced search

### "Should Have" Features
- Sort by due date or creation date
- Toggle ascending/descending order
- Search by task name with match highlighting

---

## 🧠 Design Decisions

### 1. Keeping It Simple: No External State/Data Libraries
I intentionally avoided libraries like Redux, Zustand, or React Query to keep the app lean and readable. React’s built-in hooks (`useState`, `useEffect`) are sufficient for the current scope.  
If the project scaled (e.g. global filters, caching), I’d consider React Query or Context.

### 2. Scaling Strategy: Thousands of Tasks
To handle the risk of large datasets:
- ✅ **Server-side pagination** via `page` and `pageSize` query params
- ✅ **Debounced search** to limit network requests
- ✅ Lightweight rendering of task items
- ✅ Reusable, isolated components

Result: The app performs well even with large datasets, without complex techniques like virtual scrolling.

### 3. Shared Modal Form Component
The `TaskForm` component handles both creation and editing:
- Takes `mode` prop (`Create` or `Edit`)
- Uses `initialData` for pre-filling during edits
- Validates presence of all required fields

### 4. Backend Assumptions

#### Endpoints
- `POST /tasks`: Create task  
- `GET /tasks`: List tasks  
  → accepts `search`, `sortBy`, `sortOrder`, `page`, `pageSize`  
- `PUT /tasks/:id`: Edit task

#### Sample Response Format
```json
{
  "data": [/* task objects */],
  "total": 1234
}
```
### 5.▶️ Getting Started

#### Frontend
```bash
cd frontend
npm install
npm start
```
#### Backend
```bash
cd backend
npm install
npm run dev
```
Ensure the backend runs at http://localhost:4000, or update it via .env:

```env

REACT_APP_API_URL=http://your-api-url
```
### 6.💡 "Should Have" Story Implementation
Each of these features was implemented with a clean separation of concerns and scalable design:

- Sort by due/created date: Dropdown menu sends enum value to API via query params.
- Toggle sort direction: Simple toggle with visual feedback and controlled param (asc/desc).
- Search by name: Debounced (300ms) input sends query to API. Highlights matching substrings via RegEx-based text splitter.

### 7.📦 External Libraries Used
Library	Purpose
- `axios`	HTTP requests with better ergonomics than fetch
- `lodash.debounce`	Debounced search input
- `date-fns`	Lightweight date formatting
- `@mui/material`	UI components & layout
- `@mui/icons-material`	Icons
- `@mui/x-date-pickers`	Accessible date picker

### 8.🛠️ Improvements with More Time
Here’s what I would add or refine, and how I’d approach each:

- Task Deletion
  - Add delete button on each card
  -  Confirm dialog → DELETE /tasks/:id → optimistic UI update
- Toast Notifications
  - Show success/failure using a library like notistack or MUI Snackbar
- Better Validation & Error Handling
  - Use yup schema for validation
  - Catch API/network errors gracefully
- Persist Search/Sort State in URL
  - Use useSearchParams() to make filters sharable/bookmarkable
- Empty & Loading States
  - Message for no matching results
  - Loading spinner for data fetch
- Accessibility
  - Ensure full keyboard navigation
  - Add appropriate aria tags
- Testing
  - Unit tests for TaskCard, TaskForm
  - Integration tests with React Testing Library or Playwright
- Mobile Responsiveness
  - Use MUI Grid & media queries to support smaller screens
