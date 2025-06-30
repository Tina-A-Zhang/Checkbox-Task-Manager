import { Box, Typography, Button } from "@mui/material";

type HeaderBarProps = {
  onAddClick: () => void;
};

export const HeaderBar = ({ onAddClick }: HeaderBarProps) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: 2, backgroundColor: "yellow" }}
      padding={2}
    >
      <Typography variant="h4" fontWeight="bold">
        Tina's Task Management Software
      </Typography>
      <Button variant="contained" color="primary" onClick={onAddClick}>
        Create a task
      </Button>
    </Box>
  );
};

export {};
