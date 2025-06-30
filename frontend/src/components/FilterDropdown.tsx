import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

type FilterDropdownProps = {
  onSortChange: (sortBy: "dueDate" | "createDate") => void;
};

export const FilterDropdown = ({ onSortChange }: FilterDropdownProps) => {
  const handleChange = (e: SelectChangeEvent) => {
    onSortChange(e.target.value as "dueDate" | "createDate");
  };

  return (
    <FormControl size="small">
      <InputLabel>Sort by</InputLabel>
      <Select defaultValue="dueDate" label="Sort by" onChange={handleChange}>
        <MenuItem value="dueDate">Due Date</MenuItem>
        <MenuItem value="createDate">Create Date</MenuItem>
      </Select>
    </FormControl>
  );
};

export {};
