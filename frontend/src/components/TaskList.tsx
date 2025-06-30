import { TaskCard, Task } from "./TaskCard";

const mockTasks: Task[] = [
  {
    id: "1",
    name: "say hello",
    description: "say hello to tina",
    dueDate: new Date().toISOString(),
    createDate: new Date(Date.now() - 87400000).toISOString(),
  },
  {
    id: "2",
    name: "say bonjour",
    description: "say bonjour to tina",
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    createDate: new Date().toISOString(),
  },
  {
    id: "3",
    name: "say salam",
    description: "say salam to tina",
    dueDate: new Date(Date.now() + 816400000).toISOString(),
    createDate: new Date().toISOString(),
  },
  {
    id: "4",
    name: "say hey",
    description: "say bonjour to tina",
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    createDate: new Date().toISOString(),
  },
  {
    id: "5",
    name: "say morning",
    description: "say salam to tina",
    dueDate: new Date(Date.now() + 816400000).toISOString(),
    createDate: new Date().toISOString(),
  },
];

export const TaskList = () => {
  return (
    <>
      {mockTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
};

export {};
