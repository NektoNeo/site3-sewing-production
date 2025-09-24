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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { READY_COLUMNS, READY_ROWS } from "@/lib/table-data";
import { Search, RotateCcw } from "lucide-react";

export function CatalogSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState<"all" | "100-500" | "1000+">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Extract unique categories from product names (first line before \n)
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    READY_ROWS.forEach(row => {
      const name = row["Наименование"];
      if (name) {
        const category = name.split('\n')[0].trim();
        if (category) uniqueCategories.add(category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, []);

  const filteredRows = useMemo(() => {
    let filtered = READY_ROWS;

    // Search filter - search in all columns
    if (searchTerm) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((row) => {
        const name = row["Наименование"];
        if (name) {
          const category = name.split('\n')[0].trim();
          return category === categoryFilter;
        }
        return false;
      });
    }

    // Price range filter based on specific columns
    if (filterRange === "100-500") {
      // Show rows where "От 100-500 шт" column has a value (not empty)
      filtered = filtered.filter((row) =>
        row["От 100-500 шт"] && row["От 100-500 шт"].trim() !== ""
      );
    } else if (filterRange === "1000+") {
      // Show rows where "От 1000 шт" or "От 3000 шт" columns have values
      filtered = filtered.filter((row) =>
        (row["От 1000 шт"] && row["От 1000 шт"].trim() !== "") ||
        (row["От 3000 шт"] && row["От 3000 шт"].trim() !== "")
      );
    }

    return filtered;
  }, [searchTerm, filterRange, categoryFilter]);

  const handleReset = () => {
    setSearchTerm("");
    setFilterRange("all");
    setCategoryFilter("all");
  };

  return (
    <section id="catalog" className="section md:scroll-mt-24 bg-black">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <span className="tag">Каталог</span>
            <h2 className="h2 text-4xl md:text-5xl text-white mt-4">Готовая продукция</h2>
            <div className="h2line max-w-md mx-auto" />
          </div>

          {/* Filter Controls */}
          <div className="filters-bar flex flex-wrap gap-3 items-center justify-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mist-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Поиск по таблице…"
                className="control-glass w-[250px] pl-10 pr-4 py-2 rounded-full text-white placeholder-mist-400 border-white/20 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-[#D64218]/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={filterRange} onValueChange={(value: "all" | "100-500" | "1000+") => setFilterRange(value)}>
              <SelectTrigger className="control-glass w-[180px] text-white border-white/20 rounded-full">
                <SelectValue placeholder="Тираж" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">Все</SelectItem>
                <SelectItem value="100-500" className="text-white hover:bg-white/10 focus:bg-white/10">От 100–500</SelectItem>
                <SelectItem value="1000+" className="text-white hover:bg-white/10 focus:bg-white/10">От 1000</SelectItem>
              </SelectContent>
            </Select>

            {categories.length > 0 && (
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="control-glass w-[180px] text-white border-white/20 rounded-full">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                  <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">Все категории</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-white/10 focus:bg-white/10">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-mist-300 hover:text-white hover:bg-white/10 rounded-full px-4"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Сброс
            </Button>
          </div>

          {/* Table Panel */}
          <div className="panel relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-xl border border-[rgba(165,171,175,.22)] shadow-[0_10px_40px_rgba(0,0,0,.35)]">
            <div
              className="overflow-x-auto relative"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
              }}
            >
              <Table className="relative group">
                <TableHeader className="sticky top-0 z-10">
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    {READY_COLUMNS.map((column, colIndex) => (
                      <TableHead
                        key={column}
                        className={`whitespace-pre-line bg-black/30 backdrop-blur-xl text-mist-300 uppercase tracking-wider text-xs font-medium border-b border-white/10 px-6 py-4 group/col hover:bg-white/[0.03] transition-colors relative col-${colIndex}`}
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
                          border-b border-white/5 transition-all group/row
                          ${index % 2 === 0 ? 'bg-white/0' : 'bg-white/[0.02]'}
                          hover:bg-white/[0.03]
                        `}
                      >
                        {READY_COLUMNS.map((column, colIndex) => (
                          <TableCell
                            key={column}
                            className={`whitespace-pre-line text-mist-200 px-6 py-4 transition-colors group-hover/row:bg-white/[0.02] hover:bg-white/[0.05] relative col-${colIndex}`}
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