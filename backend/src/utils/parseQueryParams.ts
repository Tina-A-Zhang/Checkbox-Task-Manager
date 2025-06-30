import { Request } from "express";
import { SortOptionsEnum } from "../types/SortOptionsEnum";
import { SortOrderEnum } from "../types/SortOrderEnum";

export function parseQueryParams(req: Request): {
  search: string;
  sortBy: SortOptionsEnum;
  sortOrder: SortOrderEnum;
  page: number;
  pageSize: number;
} {
  const {
    search = "",
    sortBy = SortOptionsEnum.DueDate,
    sortOrder = SortOrderEnum.Asc,
    page = "1",
    pageSize = "10",
  } = req.query;

  // Validate sortBy
  if (!Object.values(SortOptionsEnum).includes(sortBy as SortOptionsEnum)) {
    throw new Error(
      `Invalid sortBy value: "${sortBy}". Allowed: ${Object.values(
        SortOptionsEnum
      ).join(", ")}`
    );
  }

  // Validate sortOrder
  if (!Object.values(SortOrderEnum).includes(sortOrder as SortOrderEnum)) {
    throw new Error(
      `Invalid sortOrder value: "${sortOrder}". Allowed: ${Object.values(
        SortOrderEnum
      ).join(", ")}`
    );
  }

  // Validate page
  const pageNum = parseInt(page as string, 10);
  if (isNaN(pageNum) || pageNum < 1) {
    throw new Error("Invalid page number. Must be a positive integer.");
  }

  // Validate pageSize
  const size = parseInt(pageSize as string, 10);
  if (isNaN(size) || size < 1 || size > 100) {
    throw new Error("Invalid pageSize. Must be between 1 and 100.");
  }

  return {
    search: (search as string).toLowerCase(),
    sortBy: sortBy as SortOptionsEnum,
    sortOrder: sortOrder as SortOrderEnum,
    page: pageNum,
    pageSize: size,
  };
}
