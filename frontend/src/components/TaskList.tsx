import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import axios from "axios";
import { Task } from "../types/Task";
import { SortOptionsEnum } from "../types/SortOptionsEnum";

type TaskListProps = {
  searchTerm: string;
  sortBy: SortOptionsEnum;
};

export const TaskList = ({ searchTerm, sortBy }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/tasks", {
        params: { search: searchTerm, sortBy },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.error("Failed to fetch tasks", err);
      });
  }, [searchTerm, sortBy]);

  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
};

export {};
