import { Task } from "./Task";

export type PaginatedTasksResponse = {
  tasks: Task[];
  total: number;
};