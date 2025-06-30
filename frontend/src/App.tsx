import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
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
import { TaskFormModeEnum } from "./types/TaskFormModeEnum";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOptionsEnum>(
    SortOptionsEnum.DueDate
  );
  const [sortOrder, setSortOrder] = useState<SortOrderEnum>(SortOrderEnum.Asc);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [tasks, setTasks] = useState<Task[]>([]);

  const onToggleSortOrder = () => {
    setSortOrder(
      sortOrder === SortOrderEnum.Asc ? SortOrderEnum.Desc : SortOrderEnum.Asc
    );
  };

  const onEditClick = (task: Task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const fetchTasks = () => {
    axios
      .get(`${API_URL}/tasks`, {
        params: { search: searchTerm, sortBy, sortOrder, page, pageSize },
      })
      .then((res) => {
        setTasks(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => console.error("Failed to fetch tasks", err));
  };

  useEffect(() => {
    fetchTasks();
  }, [searchTerm, sortBy, sortOrder, page]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, sortOrder]);

  const onAddTask = (newTask: TaskCreationType) => {
    addTaskAndRefresh(
      newTask,
      searchTerm,
      sortBy,
      sortOrder,
      page,
      pageSize
    ).then(({ tasks, total }) => {
      setTasks(tasks);
      setTotal(total);
    });
  };

  const onEditTask = (updatedTask: TaskCreationType) => {
    if (!editTask) return;

    axios
      .put(`${API_URL}/tasks/${editTask.id}`, updatedTask)
      .then(() => {
        setEditTask(null);
        setShowForm(false);
        fetchTasks();
      })
      .catch((err) => console.error("Failed to update task", err));
  };

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300)
  ).current;

  const handleFormClose = () => {
    setShowForm(false);
    setEditTask(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <HeaderBar onAddClick={() => setShowForm(true)} />
      <Box px={3}>
        <NavBar
          onSearch={(value) => debouncedSearch(value)}
          onSortChange={setSortBy}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onToggleSortOrder={onToggleSortOrder}
        />
        <TaskList
          tasks={tasks}
          searchTerm={searchTerm}
          onEditClick={onEditClick}
        />
        <PaginationBar
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </Box>
      <TaskForm
        open={showForm}
        onClose={handleFormClose}
        onSubmit={editTask ? onEditTask : onAddTask}
        initialData={
          editTask
            ? {
                name: editTask.name,
                description: editTask.description,
                dueDate: editTask.dueDate,
              }
            : undefined
        }
        mode={editTask ? TaskFormModeEnum.Edit : TaskFormModeEnum.Create}
      />
    </LocalizationProvider>
  );
}

export default App;
