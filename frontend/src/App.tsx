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
import { addTaskAndRefresh } from "./services/taskService";
import { TaskCreationType } from "./types/TaskCreationType";
import { PaginationBar } from "./components/PaginationBar";
import { SortOrderEnum } from "./types/SortOrderEnum";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOptionsEnum>(
    SortOptionsEnum.DueDate
  );
  const [sortOrder, setSortOrder] = useState<SortOrderEnum>(SortOrderEnum.Asc);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // keep constant for now
  const [total, setTotal] = useState(0);

  const [tasks, setTasks] = useState<Task[]>([]);

  const onSortOrderChange = () => {
    setSortOrder(
      sortOrder === SortOrderEnum.Asc ? SortOrderEnum.Desc : SortOrderEnum.Asc
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/tasks", {
        params: { search: searchTerm, sortBy, sortOrder, page, pageSize },
      })
      .then((res) => {
        setTasks(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, [searchTerm, sortBy, sortOrder, page]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, sortOrder]);

  const onAddTask = (newTask: TaskCreationType) => {
    addTaskAndRefresh(newTask, searchTerm, sortBy, page, pageSize).then(
      ({ tasks, total }) => {
        setTasks(tasks);
        setTotal(total);
      }
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <HeaderBar onAddClick={() => setShowForm(true)} />
      <Box px={3}>
        <NavBar
          onSearch={setSearchTerm}
          onSortChange={setSortBy}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortOrderChange={onSortOrderChange}
        />
        <TaskList tasks={tasks} searchTerm={searchTerm} />
        <PaginationBar
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </Box>
      <TaskForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={(newTask) => onAddTask(newTask)}
      />
    </LocalizationProvider>
  );
}

export default App;
