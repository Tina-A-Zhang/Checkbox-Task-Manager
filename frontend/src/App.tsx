import { HeaderBar } from "./components/HeaderBar";
import { NavBar } from "./components/NavBar";
import { TaskList } from "./components/TaskList";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <HeaderBar onAddClick={() => console.log("add")} />
      <Box px={3}>
        <NavBar
          onSearch={() => console.log("search")}
          onSortChange={() => console.log("sort")}
        />
        <TaskList />
      </Box>
    </>
  );
}

export default App;
