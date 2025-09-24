"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { READY_COLUMNS, READY_ROWS } from "@/lib/table-data";
import { Search } from "lucide-react";

export function CatalogSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState<"all" | "100-500" | "1000+">("all");

  const filteredRows = useMemo(() => {
    let filtered = READY_ROWS;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Price range filter (assuming there's a price-like column)
    if (filterRange !== "all") {
      filtered = filtered.filter((row) => {
        // Try to find a numeric value in the row for filtering
        const numericValues = Object.values(row)
          .map(v => {
            const str = String(v);
            const num = parseFloat(str.replace(/[^\d.-]/g, ''));
            return isNaN(num) ? null : num;
          })
          .filter(v => v !== null) as number[];

        if (numericValues.length === 0) return true;
        const maxValue = Math.max(...numericValues);

        if (filterRange === "100-500") {
          return maxValue >= 100 && maxValue <= 500;
        } else if (filterRange === "1000+") {
          return maxValue >= 1000;
        }
        return true;
      });
    }

    return filtered;
  }, [searchTerm, filterRange]);

  return (
    <section id="catalog" className="py-16 md:scroll-mt-24 bg-black">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Готовая продукция</h2>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mist-400" />
              <input
                type="text"
                placeholder="Поиск по таблице..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-mist-400 focus:outline-none focus:ring-2 focus:ring-electric-400/50 focus:border-electric-400/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="priceFilter"
                  checked={filterRange === "all"}
                  onChange={() => setFilterRange("all")}
                  className="w-4 h-4 text-electric-400 bg-white/5 border-white/20 focus:ring-electric-400/50"
                />
                <span className="text-mist-300 group-hover:text-white transition-colors">Все</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="priceFilter"
                  checked={filterRange === "100-500"}
                  onChange={() => setFilterRange("100-500")}
                  className="w-4 h-4 text-electric-400 bg-white/5 border-white/20 focus:ring-electric-400/50"
                />
                <span className="text-mist-300 group-hover:text-white transition-colors">От 100-500</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="priceFilter"
                  checked={filterRange === "1000+"}
                  onChange={() => setFilterRange("1000+")}
                  className="w-4 h-4 text-electric-400 bg-white/5 border-white/20 focus:ring-electric-400/50"
                />
                <span className="text-mist-300 group-hover:text-white transition-colors">От 1000</span>
              </label>
            </div>
          </div>

          {/* Table Panel */}
          <div className="panel bg-white/[0.02] backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
            <div
              className="overflow-x-auto relative"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)",
              }}
            >
              <Table className="relative">
                <TableHeader className="sticky top-0 z-10">
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    {READY_COLUMNS.map((column) => (
                      <TableHead
                        key={column}
                        className="whitespace-pre-line bg-black/30 backdrop-blur-md text-mist-300 uppercase tracking-wider text-xs font-medium border-b border-white/10 px-6 py-4"
                      >
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row, index) => (
                      <TableRow
                        key={index}
                        className={`
                          border-b border-white/5 transition-colors
                          ${index % 2 === 0 ? 'bg-white/0' : 'bg-white/[0.02]'}
                          hover:bg-white/[0.03]
                        `}
                      >
                        {READY_COLUMNS.map((column) => (
                          <TableCell
                            key={column}
                            className="whitespace-pre-line text-mist-200 px-6 py-4"
                          >
                            {String(row[column as keyof typeof row] || "")}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={READY_COLUMNS.length}
                        className="text-center py-8 text-mist-400"
                      >
                        Ничего не найдено
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}