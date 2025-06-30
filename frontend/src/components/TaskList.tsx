import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import axios from "axios";
import { Task } from "../types/Task";
import { SortOptionsEnum } from "../types/SortOptionsEnum";

type TaskListProps = {
  tasks: Task[];
  searchTerm?: string;
};

export const TaskList = ({ tasks, searchTerm }: TaskListProps) => {
  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} searchTerm={searchTerm} />
      ))}
    </>
  );
};

export {};
