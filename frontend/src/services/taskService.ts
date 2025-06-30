import axios from 'axios';
import { Task } from '../types/Task';
import { SortOptionsEnum } from '../types/SortOptionsEnum';
import { TaskCreationType } from '../types/TaskCreationType';

export const addTaskAndRefresh = async (
  task:TaskCreationType,
  searchTerm: string,
  sortBy: SortOptionsEnum
): Promise<Task[]> => {
  await axios.post('http://localhost:4000/tasks', task);
  const res = await axios.get('http://localhost:4000/tasks', {
    params: { search: searchTerm, sortBy },
  });
  return res.data;
};
