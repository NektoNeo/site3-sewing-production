"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  FilterFn,
} from "@tanstack/react-table";
import { TableVirtuoso } from "react-virtuoso";
import { cn } from "@/lib/utils";

export interface VirtualizedTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: TData, index: number) => string);
  virtualizeThreshold?: number;
  estimatedRowHeight?: number;
  overscan?: number;
  globalFilter?: string;
  onRowClick?: (row: TData) => void;
  stickyHeader?: boolean;
  contentVisibility?: boolean;
}

export function VirtualizedTable<TData>({
  data,
  columns,
  className,
  containerClassName,
  headerClassName,
  rowClassName,
  virtualizeThreshold = 40,
  estimatedRowHeight = 60,
  overscan = 5,
  globalFilter = "",
  onRowClick,
  stickyHeader = true,
  contentVisibility = true,
}: VirtualizedTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const globalFilterFn: FilterFn<TData> = useCallback((row, columnId, filterValue) => {
    if (!filterValue) return true;

    const searchValue = filterValue.toLowerCase();
    const rowValues = Object.values(row.original as any).map(v =>
      String(v || "").toLowerCase()
    );

    return rowValues.some(value => value.includes(searchValue));
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn,
  });

  const { rows } = table.getRowModel();
  const shouldVirtualize = rows.length > virtualizeThreshold;

  const headerContent = useMemo(() => (
    <thead
      className={cn(
        "bg-black/30 backdrop-blur-xl",
        stickyHeader && "sticky top-0 z-20",
        headerClassName
      )}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="border-b border-white/10">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="px-[var(--space-lg)] py-[var(--space-md)] text-left text-xs font-medium uppercase tracking-wider text-mist-300"
              style={{
                width: header.getSize(),
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  ), [table, headerClassName, stickyHeader]);

  const rowRenderer = useCallback((index: number) => {
    const row = rows[index];
    const rowClassValue = typeof rowClassName === "function"
      ? rowClassName(row.original, index)
      : rowClassName;

    return (
      <tr
        key={row.id}
        onClick={() => onRowClick?.(row.original)}
        className={cn(
          "border-b border-white/5 transition-all duration-200 ease-out",
          index % 2 === 0 ? "bg-white/0" : "bg-white/[0.02]",
          "hover:bg-[#D64218]/[0.03] hover:shadow-[inset_0_0_0_1px_rgba(214,66,24,0.1)]",
          onRowClick && "cursor-pointer hover:scale-[1.002]",
          rowClassValue
        )}
        style={contentVisibility ? {
          contentVisibility: "auto",
          containIntrinsicSize: `auto ${estimatedRowHeight}px`,
        } : undefined}
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className="px-[var(--space-lg)] py-[var(--space-md)] text-mist-200 whitespace-pre-line"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    );
  }, [rows, rowClassName, onRowClick, contentVisibility, estimatedRowHeight]);

  if (!shouldVirtualize) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-auto",
          containerClassName
        )}
      >
        <table className={cn("w-full", className)}>
          {headerContent}
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    "border-b border-white/5 transition-all duration-200 ease-out",
                    index % 2 === 0 ? "bg-white/0" : "bg-white/[0.02]",
                    "hover:bg-[#D64218]/[0.03] hover:shadow-[inset_0_0_0_1px_rgba(214,66,24,0.1)]",
                    onRowClick && "cursor-pointer hover:scale-[1.002]",
                    typeof rowClassName === "function"
                      ? rowClassName(row.original, index)
                      : rowClassName
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-[var(--space-lg)] py-[var(--space-md)] text-mist-200 whitespace-pre-line"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-mist-400"
                >
                  Ничего не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <TableVirtuoso
      className={cn("relative", containerClassName)}
      style={{ height: "600px" }}
      data={rows}
      overscan={overscan}
      components={{
        Table: ({ style, ...props }) => (
          <table
            {...props}
            style={{ ...style, width: "100%" }}
            className={cn("w-full", className)}
          />
        ),
        TableBody: ({ style, ...props }) => (
          <tbody {...props} style={style} />
        ),
      }}
      fixedHeaderContent={() => headerContent}
      itemContent={rowRenderer}
    />
  );
}