import { ChangeEvent } from "react";
import { TextField } from "@mui/material";

type SearchBarProps = {
  onSearch: (term: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <TextField
      label="Search tasks"
      aria-label="Search tasks"
      placeholder="Type to search..."
      variant="outlined"
      size="small"
      onChange={handleChange}
    />
  );
};
