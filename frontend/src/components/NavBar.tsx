import { Box } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { FilterDropdown } from "./FilterDropdown";
import { SortOptionsEnum } from "../types/SortOptionsEnum";

type NavBarProps = {
  onSearch: (term: string) => void;
  onSortChange: (sortBy: SortOptionsEnum) => void;
};

export const NavBar = ({ onSearch, onSortChange }: NavBarProps) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: 2 }}
    >
      <SearchBar onSearch={onSearch} />
      <FilterDropdown onSortChange={onSortChange} />
    </Box>
  );
};

export {};
