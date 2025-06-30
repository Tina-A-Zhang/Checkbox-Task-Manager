import axios from "axios";
import { SortOptionsEnum } from "../types/SortOptionsEnum";
import { TaskCreationType } from "../types/TaskCreationType";
import { PaginatedTasksResponse } from "../types/PaginatedTasksResponse";

export const addTaskAndRefresh = async (
  task: TaskCreationType,
  searchTerm: string,
  sortBy: SortOptionsEnum,
  page: number,
  pageSize: number
): Promise<PaginatedTasksResponse> => {
  await axios.post("http://localhost:4000/tasks", task);
  const res = await axios.get("http://localhost:4000/tasks", {
    params: { search: searchTerm, sortBy, page, pageSize },
  });
  return {
    tasks: res.data.data,
    total: res.data.total,
  };
};
