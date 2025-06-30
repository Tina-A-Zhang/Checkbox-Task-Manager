# ✅ Task Management App – Checkbox Take-Home Submission

Hi Checkbox team 👋

Thank you for the opportunity to complete this take-home task.  
This repository showcases a simple yet scalable implementation of a task management system, focusing on **clarity, performance, and production-readiness**.

---

## 🎯 Features Implemented

### Core Requirements
- Create new tasks with required fields: name, description, due date
- View all tasks in a list view with:
  - Name, Description, Due Date, Create Date
  - Status badges: Not Urgent / Due Soon / Overdue (based on due date logic)
- Edit tasks (inline modal form)
- Pagination and sorting support
- Real-time search with debounced input

### "Should Have" Features
- Sort by due date or create date
- Toggle sort direction (ascending/descending)
- Search by name (with highlighted results)

---

## 🧠 Key Design Decisions

### 1. Why No State Management / Data Fetching Library
I chose **not to introduce Redux, Zustand, React Query**, etc., because:
- The project scope is **intentionally simple**, and React’s built-in hooks (`useState`, `useEffect`) are sufficient.
- This approach avoids overengineering while keeping the code **clean and readable**.
- In a larger production app, I would adopt a state or data-fetching library once cross-component state or caching becomes painful.

> ✅ For this task, simplicity over abstraction made the most sense.

---

### 2. How I Handled the Main Risk: Scale
One of the main risks mentioned was the possibility of **thousands of tasks**. Here's how I addressed that:

- ✅ **Server-side pagination**: Client never loads all tasks at once.
- ✅ API accepts `page`, `pageSize`, `search`, `sortBy`, and `sortOrder`.
- ✅ **Debounced search input** (300ms) prevents excessive network calls.
- ✅ **Lightweight `TaskCard` rendering** avoids performance bottlenecks.
- ✅ Components are structured for **reusability and isolation**.

> Result: Efficient and performant even with large datasets, without needing virtual scroll.

---

### 3. Shared Modal Form Strategy
- A single `TaskForm` component is reused for both create/edit flows.
- `mode` prop (`Create` or `Edit`) dynamically changes dialog label and button.
- `initialData` pre-fills the form during edit.
- Validation ensures `name`, `description`, and `dueDate` are present before submit.

---

### 4. API Assumptions
I assumed a RESTful backend with the following structure:

#### Endpoints
- `POST /tasks`: Create a task
- `GET /tasks`: List tasks  
   → accepts query params: `search`, `sortBy`, `sortOrder`, `page`, `pageSize`
- `PUT /tasks/:id`: Edit a task

#### Response format for `GET /tasks`
```json
{
  "data": [/* task objects */],
  "total": 1234
}

### 5. How to Run It

#### ▶️ Run the frontend
```bash
cd frontend
npm install
npm start
````

#### ▶️ Start the app
Open a separate terminal
```bash
cd backend
npm install
npm run dev
```

Make sure the backend is running at:

```
http://localhost:4000
```

You can also customize the API base URL by creating a `.env` file:

```env
REACT_APP_API_URL=http://your-api-url
```
