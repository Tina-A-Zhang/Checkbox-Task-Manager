import { useState, useEffect } from "react";
import axios from "axios";
import { HeaderBar } from "./components/HeaderBar";
import { NavBar } from "./components/NavBar";
import { TaskList } from "./components/TaskList";
import { Box } from "@mui/material";
import { TaskForm } from "./components/TaskForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SortOptionsEnum } from "./types/SortOptionsEnum";
import { Task } from "./types/Task";
function App() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOptionsEnum>(
    SortOptionsEnum.DueDate
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/tasks", {
        params: { search: searchTerm, sortBy },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, [searchTerm, sortBy]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <HeaderBar onAddClick={() => setShowForm(true)} />
      <Box px={3}>
        <NavBar onSearch={setSearchTerm} onSortChange={setSortBy} />
        <TaskList tasks={tasks} />
      </Box>
      <TaskForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={() => {
          console.log("adding new task");
        }}
      />
    </LocalizationProvider>
  );
}

export default App;
