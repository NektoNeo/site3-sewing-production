"use client";

import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "@/lib/use-debounce";
import { VirtualizedTable } from "@/components/ui/virtualized-table";
import { FilterToolbar, FilterConfig } from "@/components/ui/filter-toolbar";
import { READY_COLUMNS, READY_ROWS } from "@/lib/table-data";
import { ColumnDef } from "@tanstack/react-table";

type CatalogRow = typeof READY_ROWS[0];

export function CatalogSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 150);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    READY_ROWS.forEach((row) => {
      const name = row["Наименование"];
      if (name) {
        const category = name.split("\n")[0].trim();
        if (category) uniqueCategories.add(category);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, []);

  const filters: FilterConfig[] = [
    {
      id: "search",
      label: "Поиск",
      type: "search",
      placeholder: "Поиск по таблице…",
    },
    {
      id: "range",
      label: "Тираж",
      type: "select",
      placeholder: "Выберите тираж",
      options: [
        { value: "100-500", label: "От 100–500" },
        { value: "1000+", label: "От 1000" },
      ],
    },
    {
      id: "category",
      label: "Категория",
      type: "combobox",
      placeholder: "Выберите категории",
      multiple: true,
      options: categories.map((cat) => ({ value: cat, label: cat })),
    },
  ];

  const filterValues = useMemo(
    () => ({
      search: searchTerm,
      range: filterRange,
      category: categoryFilter,
    }),
    [searchTerm, filterRange, categoryFilter]
  );

  const handleFilterChange = useCallback((filterId: string, value: any) => {
    switch (filterId) {
      case "search":
        setSearchTerm(value);
        break;
      case "range":
        setFilterRange(value);
        break;
      case "category":
        setCategoryFilter(value);
        break;
    }
  }, []);

  const handleReset = useCallback(() => {
    setSearchTerm("");
    setFilterRange("all");
    setCategoryFilter([]);
  }, []);

  const filteredRows = useMemo(() => {
    let filtered = READY_ROWS;

    if (debouncedSearchTerm) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      );
    }

    if (categoryFilter.length > 0) {
      filtered = filtered.filter((row) => {
        const name = row["Наименование"];
        if (name) {
          const category = name.split("\n")[0].trim();
          return categoryFilter.includes(category);
        }
        return false;
      });
    }

    if (filterRange === "100-500") {
      filtered = filtered.filter(
        (row) => row["От 100-500 шт"] && row["От 100-500 шт"].trim() !== ""
      );
    } else if (filterRange === "1000+") {
      filtered = filtered.filter(
        (row) =>
          (row["От 1000 шт"] && row["От 1000 шт"].trim() !== "") ||
          (row["От 3000 шт"] && row["От 3000 шт"].trim() !== "")
      );
    }

    return filtered;
  }, [debouncedSearchTerm, filterRange, categoryFilter]);

  const columns: ColumnDef<CatalogRow>[] = useMemo(
    () =>
      READY_COLUMNS.map((col) => ({
        accessorKey: col,
        header: col,
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return value || "";
        },
      })),
    []
  );

  return (
    <section
      data-surface="dark"
      id="catalog"
      className="section md:scroll-mt-24 bg-black"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 900px" }}
    >
      <div className="container max-w-7xl mx-auto px-[var(--space-md)]">
        <div className="space-y-[var(--space-xl)]">
          <div className="text-center space-y-4">
            <span className="tag">Каталог</span>
            <h2 className="h2 text-4xl md:text-5xl text-white mt-4">
              Готовая продукция
            </h2>
            <div className="h2line max-w-md mx-auto" />
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
              className="catalog-table"
              containerClassName="catalog-wrap rounded-2xl"
              headerClassName="bg-black/30 backdrop-blur-xl"
              virtualizeThreshold={40}
              estimatedRowHeight={100}
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