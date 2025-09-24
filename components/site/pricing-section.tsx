"use client";

import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "@/lib/use-debounce";
import { VirtualizedTable } from "@/components/ui/virtualized-table";
import { FilterToolbar, FilterConfig } from "@/components/ui/filter-toolbar";
import { Badge } from "@/components/ui/badge";
import { PRICING_HEADER_NOTE, PRICING_COLUMNS, PRICING_ROWS } from "@/lib/table-data";
import { ColumnDef } from "@tanstack/react-table";

type PricingRow = typeof PRICING_ROWS[0];

export function PricingSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const debouncedSearchTerm = useDebounce(searchTerm, 150);

  const filters: FilterConfig[] = [
    {
      id: "category",
      label: "Изделие",
      type: "select",
      placeholder: "Фильтр изделий",
      options: [
        { value: "tshirts", label: "Футболки" },
        { value: "hoodies", label: "Худи" },
        { value: "jackets", label: "Ветровки" },
        { value: "other", label: "Прочее" },
      ],
    },
    {
      id: "range",
      label: "Тираж",
      type: "select",
      placeholder: "Выберите тираж",
      options: [
        { value: "100-500", label: "100–500 шт" },
        { value: "1000+", label: "От 1000 шт" },
      ],
    },
    {
      id: "search",
      label: "Поиск",
      type: "search",
      placeholder: "Поиск по таблице…",
    },
  ];

  const filterValues = useMemo(
    () => ({
      category: filterCategory,
      range: filterRange,
      search: searchTerm,
    }),
    [filterCategory, filterRange, searchTerm]
  );

  const handleFilterChange = useCallback((filterId: string, value: any) => {
    switch (filterId) {
      case "category":
        setFilterCategory(value);
        break;
      case "range":
        setFilterRange(value);
        break;
      case "search":
        setSearchTerm(value);
        break;
    }
  }, []);

  const handleReset = useCallback(() => {
    setSearchTerm("");
    setFilterRange("all");
    setFilterCategory("all");
  }, []);

  const filteredRows = useMemo(() => {
    let filtered = PRICING_ROWS;

    if (debouncedSearchTerm) {
      filtered = filtered.filter((row) =>
        row["Наименование"].toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        row["Описание"].toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((row) => {
        const name = row["Наименование"].toLowerCase();
        switch (filterCategory) {
          case "tshirts":
            return name.includes("футболк");
          case "hoodies":
            return name.includes("худи") || name.includes("свитш");
          case "jackets":
            return name.includes("ветровк") || name.includes("куртк");
          case "other":
            return (
              !name.includes("футболк") &&
              !name.includes("худи") &&
              !name.includes("свитш") &&
              !name.includes("ветровк") &&
              !name.includes("куртк")
            );
          default:
            return true;
        }
      });
    }

    if (filterRange === "100-500") {
      filtered = filtered.filter(
        (row) => row["От 100-500 шт"] && row["От 100-500 шт"].trim() !== ""
      );
    } else if (filterRange === "1000+") {
      filtered = filtered.filter(
        (row) => row["От 1000 шт"] && row["От 1000 шт"].trim() !== ""
      );
    }

    return filtered;
  }, [debouncedSearchTerm, filterRange, filterCategory]);

  const columns: ColumnDef<PricingRow>[] = useMemo(
    () =>
      PRICING_COLUMNS.map((col) => ({
        accessorKey: col,
        header: col,
        cell: ({ getValue }) => {
          const value = getValue() as string;
          if (col === "От 100-500 шт" || col === "От 1000 шт") {
            return value ? (
              <span className="price-value tnum text-right block">
                {value}
                <span className="currency ml-1 opacity-70">₽</span>
              </span>
            ) : (
              "—"
            );
          }
          return value || "";
        },
      })),
    []
  );

  return (
    <section
      data-surface="dark"
      id="pricing"
      className="section md:scroll-mt-24 bg-black"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}
    >
      <div className="container max-w-7xl mx-auto px-[var(--space-md)]">
        <div className="space-y-[var(--space-xl)]">
          <div className="text-center space-y-4">
            <span className="tag">Цены</span>
            <h2 className="h2 text-4xl md:text-5xl text-white mt-4">
              Стоимость услуг
            </h2>
            <div className="h2line max-w-md mx-auto" />
            <Badge variant="secondary" className="text-sm">
              {PRICING_HEADER_NOTE}
            </Badge>
          </div>

          <FilterToolbar
            filters={filters}
            values={filterValues}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            showActiveFilters={true}
          />

          <div className="panel relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-xl border border-[rgba(165,171,175,.22)] shadow-[0_10px_40px_rgba(0,0,0,.35)]">
            <VirtualizedTable
              data={filteredRows}
              columns={columns}
              className="pricing-table"
              containerClassName="pricing-wrap rounded-2xl"
              headerClassName="bg-black/30 backdrop-blur-xl"
              virtualizeThreshold={40}
              estimatedRowHeight={80}
              overscan={5}
              stickyHeader={true}
              contentVisibility={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}