import { useState } from "react";
import { HeaderBar } from "./components/HeaderBar";
import { NavBar } from "./components/NavBar";
import { TaskList } from "./components/TaskList";
import { Box } from "@mui/material";
import { TaskForm } from "./components/TaskForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SortOptionsEnum } from "./types/SortOptionsEnum";
function App() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOptionsEnum>(
    SortOptionsEnum.DueDate
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <HeaderBar onAddClick={() => setShowForm(true)} />
      <Box px={3}>
        <NavBar onSearch={setSearchTerm} onSortChange={setSortBy} />
        <TaskList searchTerm={searchTerm} sortBy={sortBy} />
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
