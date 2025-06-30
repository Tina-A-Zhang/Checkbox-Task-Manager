import { Card, CardContent, Typography, Chip } from "@mui/material";
import { format } from "date-fns";
import { Task } from "../types/Task";
import { TaskStatusEnum } from "../types/TaskStatusEnum";

const getStatus = (dueDate: string): TaskStatusEnum => {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (diff < 0) return TaskStatusEnum.Overdue;
  if (diff <= 7) return TaskStatusEnum.DueSoon;

  return TaskStatusEnum.NotUrgent;
};

export const TaskCard = ({ task }: { task: Task }) => {
  const status = getStatus(task.dueDate);

  return (
    <Card sx={{ marginBottom: 2 }} raised>
      <CardContent>
        <Typography variant="h5">{task.name}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {task.description}
        </Typography>
        <Typography variant="body2">
          Due: {format(new Date(task.dueDate), "yyyy-MM-dd")}
        </Typography>
        <Typography variant="body2">
          Created: {format(new Date(task.createDate), "yyyy-MM-dd")}
        </Typography>
        <Chip
          label={status}
          color={
            status === TaskStatusEnum.Overdue
              ? "error"
              : status === TaskStatusEnum.DueSoon
              ? "warning"
              : "default"
          }
          sx={{ marginTop: 1 }}
        />
      </CardContent>
    </Card>
  );
};

export {};
