import express, { Request } from "express";
import { randomUUID } from "crypto";
import { SortOrderEnum } from "./types/SortOrderEnum";
import { Task } from "./types/Task";
import { parseQueryParams } from "./utils/parseQueryParams";

export const tasksRouter = express.Router();

let tasks: Task[] = [];

// GET tasks with optional search/sort/pagination
tasksRouter.get("/", (req, res) => {
  try {
    const { search, sortBy, sortOrder, page, pageSize } = parseQueryParams(req);

    let filtered = tasks.filter((t) =>
      t.name.toLowerCase().includes(search)
    );

    filtered.sort((a, b) => {
      const aVal = new Date(a[sortBy]).getTime();
      const bVal = new Date(b[sortBy]).getTime();
      return sortOrder === SortOrderEnum.Desc ? bVal - aVal : aVal - bVal;
    });

    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    res.json({
      total: filtered.length,
      page,
      pageSize,
      data: paginated,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});


// POST create a new task
tasksRouter.post("/", (req, res) => {
  const { name, description, dueDate } = req.body;

  if (
    !name || !description || !dueDate ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof dueDate !== "string"
  ) {
    return res.status(400).json({ error: "Invalid task data" });
  }

  const newTask: Task = {
    id: randomUUID(),
    name,
    description,
    dueDate,
    createDate: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
tasksRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, dueDate } = req.body;

  if (
    !name || !description || !dueDate ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof dueDate !== "string"
  ) {
    return res.status(400).json({ error: "Invalid task data" });
  }

  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.name = name;
  task.description = description;
  task.dueDate = dueDate;

  res.json(task);
});
