

import express from 'express'; 
type Task = {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  createDate: string;
};

export const tasksRouter = express.Router(); 

let tasks: Task[] = [];

// Get tasks (optional search and sort)
tasksRouter.get('/', (req, res) => {
  const {
    search = '', 
    sortBy = 'dueDate',
    sortOrder = 'asc',
    page = '1',
    pageSize = '10',
  } = req.query;

  let filtered = tasks.filter((t) =>
    t.name.toLowerCase().includes((search as string).toLowerCase())
  );

 filtered.sort((a, b) => {
  const aVal = new Date(a[sortBy as keyof Task]).getTime();
  const bVal = new Date(b[sortBy as keyof Task]).getTime();
  return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
});

  // Pagination logic
  const pageNumber = parseInt(page as string, 10);
  const size = parseInt(pageSize as string, 10);
  const start = (pageNumber - 1) * size;
  const paginated = filtered.slice(start, start + size);

  res.json({
    total: filtered.length,
    page: pageNumber,
    pageSize: size,
    data: paginated,
  });
});



// Add task
tasksRouter.post('/', (req, res) => {
  const { name, description, dueDate } = req.body;
  const newTask: Task = {
    id: Date.now().toString(),
    name,
    description,
    dueDate,
    createDate: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

tasksRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, dueDate } = req.body as {
    name: string;
    description: string;
    dueDate: string;
  };

  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).send('Task not found');

  if (name) task.name = name;
  if (description) task.description = description;
  if (dueDate) task.dueDate = dueDate;

  res.json(task);
});


