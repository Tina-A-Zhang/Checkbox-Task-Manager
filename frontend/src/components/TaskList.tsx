import { TaskCard } from "./TaskCard";
import { Task } from "../types/Task";

type TaskListProps = {
  tasks: Task[];
  searchTerm?: string;
  onEditClick: (task: Task) => void;
};

export const TaskList = ({ tasks, searchTerm, onEditClick }: TaskListProps) => {
  if (tasks.length === 0) {
    <p>No tasks found.</p>;
  }

  return (
    <>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          searchTerm={searchTerm}
          onEditClick={onEditClick}
        />
      ))}
    </>
  );
};
