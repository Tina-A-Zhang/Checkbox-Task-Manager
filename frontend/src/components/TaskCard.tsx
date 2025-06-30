import { Card, CardContent, Typography, Chip } from "@mui/material";
import { format } from "date-fns";
import { Task } from "../types/Task";

const getStatus = (dueDate: string): "Not urgent" | "Due soon" | "Overdue" => {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (diff < 0) return "Overdue";
  if (diff <= 7) return "Due soon";
  return "Not urgent";
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
            status === "Overdue"
              ? "error"
              : status === "Due soon"
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
