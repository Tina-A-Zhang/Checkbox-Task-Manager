import { Box } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { FilterDropdown } from "./FilterDropdown";
import { SortOptionsEnum } from "../types/SortOptionsEnum";
import { SortOrderEnum } from "../types/SortOrderEnum";

type NavBarProps = {
  onSearch: (term: string) => void;
  onSortChange: (sortBy: SortOptionsEnum) => void;
  sortBy: SortOptionsEnum;
  sortOrder: SortOrderEnum;
  onSortOrderChange: (sortBy: SortOrderEnum) => void;
};

export const NavBar = ({
  onSearch,
  onSortChange,
  sortBy,
  sortOrder,
  onSortOrderChange,
}: NavBarProps) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: 2 }}
    >
      <SearchBar onSearch={onSearch} />
      <FilterDropdown
        onSortChange={onSortChange}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortOrderChange={onSortOrderChange}
      />
    </Box>
  );
};

export {};
