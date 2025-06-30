import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TaskCreationType } from "../types/TaskCreationType";
import { TaskFormModeEnum } from "../types/TaskFormModeEnum";

type TaskFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: TaskCreationType) => void;
  initialData?: TaskCreationType; // for editing
  mode?: TaskFormModeEnum;
};

export const TaskForm = ({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
}: TaskFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setDueDate(new Date(initialData.dueDate));
    } else {
      setName("");
      setDescription("");
      setDueDate(null);
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    if (!name || !dueDate || !description) return;
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
      <DialogTitle>
        {mode === TaskFormModeEnum.Edit ? "Edit Task" : "Add New Task"}
      </DialogTitle>
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
          required
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
          disabled={!name || !dueDate || !description}
        >
          {mode === TaskFormModeEnum.Edit ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
