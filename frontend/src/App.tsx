import { useState } from "react";
import { HeaderBar } from "./components/HeaderBar";
import { NavBar } from "./components/NavBar";
import { TaskList } from "./components/TaskList";
import { Box } from "@mui/material";
import { TaskForm } from "./components/TaskForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Import the date-fns adapter

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <HeaderBar onAddClick={() => setShowForm(true)} />
      <Box px={3}>
        <NavBar
          onSearch={() => console.log("search")}
          onSortChange={() => console.log("sort")}
        />
        <TaskList />
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
