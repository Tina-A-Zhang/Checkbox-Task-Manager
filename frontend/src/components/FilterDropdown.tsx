import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { SortOptionsEnum } from "../types/SortOptionsEnum";
import { SortOrderEnum } from "../types/SortOrderEnum";

type FilterDropdownProps = {
  sortBy: SortOptionsEnum;
  sortOrder: SortOrderEnum;
  onSortChange: (sortBy: SortOptionsEnum) => void;
  onToggleSortOrder: () => void;
};

export const FilterDropdown = ({
  sortBy,
  sortOrder,
  onSortChange,
  onToggleSortOrder,
}: FilterDropdownProps) => {
  const handleChange = (e: SelectChangeEvent) => {
    onSortChange(e.target.value as SortOptionsEnum);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <FormControl size="small">
        <InputLabel>Sort by</InputLabel>
        <Select value={sortBy} label="Sort by" onChange={handleChange}>
          <MenuItem value={SortOptionsEnum.DueDate}>Due Date</MenuItem>
          <MenuItem value={SortOptionsEnum.CreateDate}>Create Date</MenuItem>
        </Select>
      </FormControl>

      <IconButton
        onClick={() => onToggleSortOrder()}
        size="small"
        aria-label="Toggle sort order"
      >
        {sortOrder === SortOrderEnum.Asc ? (
          <ArrowUpwardIcon />
        ) : (
          <ArrowDownwardIcon />
        )}
      </IconButton>
    </Box>
  );
};
