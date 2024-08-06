"use client"
import type { FC } from 'react';
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  url: string;
}

const PaginationComponent: FC<PaginationComponentProps> = ({ currentPage, totalPages, url }) => {
  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination total={totalPages}  page={currentPage} onChange={(page) => {
        // Navigate to the new page using Next.js Link
        window.location.href = `${url}?page=${page}`;
      }}/>
  );
};

export default PaginationComponent;
