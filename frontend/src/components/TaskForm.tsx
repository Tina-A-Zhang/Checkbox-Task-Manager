import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type TaskFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: {
    name: string;
    description: string;
    dueDate: string;
  }) => void;
};

export const TaskForm = ({ open, onClose, onSubmit }: TaskFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!name || !dueDate) return;
    onSubmit({
      name,
      description,
      dueDate: dueDate.toISOString(),
    });
    setName("");
    setDescription("");
    setDueDate(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          required
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="dense"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          slotProps={{
            textField: { fullWidth: true, margin: "dense", required: true },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!name || !dueDate}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export {};
