import { Box, Pagination, Typography } from "@mui/material";

type PaginationBarProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
};

export const PaginationBar = ({
  page,
  pageSize,
  total,
  onPageChange,
}: PaginationBarProps) => {
  const totalPages = Math.ceil(total / pageSize);

  if (total === 0) {
    return <Typography>No tasks found.</Typography>;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
    >
      <Typography variant="body2">
        Showing {Math.min((page - 1) * pageSize + 1, total)}–
        {Math.min(page * pageSize, total)} of {total}
      </Typography>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        aria-label="Pagination Navigation"
      />
    </Box>
  );
};
