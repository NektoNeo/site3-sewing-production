'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useMemo, useState, useCallback } from 'react';
import { useDebounce } from '@/lib/use-debounce';

interface Column {
  key: string;
  header: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface VirtualizedTableProps {
  data: any[];
  columns: Column[];
  rowHeight?: number;
  headerHeight?: number;
  containerHeight?: number;
  searchable?: boolean;
  className?: string;
  stickyHeader?: boolean;
  onRowClick?: (row: any) => void;
}

export function VirtualizedTable({
  data,
  columns,
  rowHeight = 60,
  headerHeight = 48,
  containerHeight = 600,
  searchable = false,
  className = '',
  stickyHeader = true,
  onRowClick,
}: VirtualizedTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  // P06: Memoized filtered data
  const filteredData = useMemo(() => {
    if (!searchable || !debouncedSearchTerm) return data;

    const lowerSearch = debouncedSearchTerm.toLowerCase();
    return data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    );
  }, [data, debouncedSearchTerm, searchable]);

  // P06: Virtual row renderer
  const virtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const totalHeight = virtualizer.getTotalSize();
  const items = virtualizer.getVirtualItems();

  return (
    <div className={`flex flex-col ${className}`}>
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Поиск..."
            className="w-full px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg
                     text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50
                     transition-colors duration-200"
          />
        </div>
      )}

      <div
        ref={parentRef}
        className="relative overflow-auto border border-purple-500/20 rounded-lg bg-gray-950/50"
        style={{ height: containerHeight }}
      >
        {/* P06: Sticky header with CSS contain */}
        <div
          className={`${stickyHeader ? 'sticky top-0 z-10' : ''}
                     bg-gray-900/90 backdrop-blur-sm border-b border-purple-500/20`}
          style={{
            height: headerHeight,
            contain: 'layout style paint'
          }}
        >
          <div className="flex items-center h-full px-4">
            {columns.map((column) => (
              <div
                key={column.key}
                className={`font-semibold text-purple-300 ${
                  column.align === 'center' ? 'text-center' :
                  column.align === 'right' ? 'text-right' : 'text-left'
                }`}
                style={{
                  width: column.width || `${100 / columns.length}%`,
                  flexShrink: column.width ? 0 : 1
                }}
              >
                {column.header}
              </div>
            ))}
          </div>
        </div>

        {/* P06: Virtual rows with content-visibility */}
        <div
          style={{
            height: totalHeight,
            width: '100%',
            position: 'relative',
          }}
        >
          {items.map((virtualRow) => {
            const row = filteredData[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full flex items-center px-4
                         hover:bg-purple-500/5 transition-colors duration-150
                         border-b border-purple-500/10 cursor-pointer"
                style={{
                  height: rowHeight,
                  transform: `translateY(${virtualRow.start}px)`,
                  contain: 'content',
                  contentVisibility: 'auto',
                  containIntrinsicSize: `auto ${rowHeight}px`,
                }}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={`text-gray-300 ${
                      column.align === 'center' ? 'text-center' :
                      column.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                    style={{
                      width: column.width || `${100 / columns.length}%`,
                      flexShrink: column.width ? 0 : 1
                    }}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      {searchable && (
        <div className="mt-2 text-sm text-gray-500">
          Показано {filteredData.length} из {data.length} записей
        </div>
      )}
    </div>
  );
}