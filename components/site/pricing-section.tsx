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
import { PRICING_HEADER_NOTE, PRICING_COLUMNS, PRICING_ROWS } from "@/lib/table-data";
import { Search, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PricingSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState<"all" | "100-500" | "1000+">("all");

  const filteredRows = useMemo(() => {
    let filtered = PRICING_ROWS;

    // Search filter - search in Наименование and Описание
    if (searchTerm) {
      filtered = filtered.filter((row) =>
        row["Наименование"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        row["Описание"].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter based on specific columns
    if (filterRange === "100-500") {
      // Show rows where "От 100-500 шт" column has a value (not empty)
      filtered = filtered.filter((row) =>
        row["От 100-500 шт"] && row["От 100-500 шт"].trim() !== ""
      );
    } else if (filterRange === "1000+") {
      // Show rows where "От 1000 шт" column has a value (not empty)
      filtered = filtered.filter((row) =>
        row["От 1000 шт"] && row["От 1000 шт"].trim() !== ""
      );
    }
    // "all" shows all rows without filtering

    return filtered;
  }, [searchTerm, filterRange]);

  const handleReset = () => {
    setSearchTerm("");
    setFilterRange("all");
  };

  return (
    <section id="pricing" className="section md:scroll-mt-24 bg-black">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <span className="tag">Цены</span>
            <h2 className="h2 text-4xl md:text-5xl text-white mt-4">Стоимость услуг</h2>
            <div className="h2line max-w-md mx-auto" />
            <Badge variant="secondary" className="text-sm">
              {PRICING_HEADER_NOTE}
            </Badge>
          </div>

          {/* Filter Controls */}
          <div className="filters-bar flex flex-wrap gap-3 items-center justify-center">
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
            <div className="pricing-wrap overflow-auto rounded-2xl">
              <Table className="pricing-table table-fixed border-separate border-spacing-0 w-full text-fg/90">
                <TableHeader className="sticky top-0 z-10">
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    {PRICING_COLUMNS.map((column, colIndex) => (
                      <TableHead
                        key={column}
                        className={`whitespace-pre-line bg-black/30 backdrop-blur-xl text-mist-300 uppercase tracking-wider text-xs font-medium border-b border-white/10 px-6 py-4 col-${colIndex}`}
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
                        `}
                      >
                        {PRICING_COLUMNS.map((column, colIndex) => (
                          <TableCell
                            key={column}
                            className={`whitespace-pre-line text-mist-200 px-6 py-4 col-${colIndex}`}
                          >
                            {column === "От 100-500 шт" || column === "От 1000 шт" ? (
                              <span className="price tnum">{String(row[column as keyof typeof row] || "")}</span>
                            ) : (
                              String(row[column as keyof typeof row] || "")
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={PRICING_COLUMNS.length}
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