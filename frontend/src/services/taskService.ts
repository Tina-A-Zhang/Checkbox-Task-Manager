import axios from "axios";
import { SortOptionsEnum } from "../types/SortOptionsEnum";
import { TaskCreationType } from "../types/TaskCreationType";
import { PaginatedTasksResponse } from "../types/PaginatedTasksResponse";
import { SortOrderEnum } from "../types/SortOrderEnum";

export const addTaskAndRefresh = async (
  task: TaskCreationType,
  searchTerm: string,
  sortBy: SortOptionsEnum,
  sortOrder: SortOrderEnum,
  page: number,
  pageSize: number
): Promise<PaginatedTasksResponse> => {
  try {
    await axios.post("http://localhost:4000/tasks", task);
    const res = await axios.get("http://localhost:4000/tasks", {
      params: { search: searchTerm, sortBy, sortOrder, page, pageSize },
    });
    return { tasks: res.data.data, total: res.data.total };
  } catch (error) {
    console.error("Failed to add task and refresh:", error);
    throw error;
  }
};
