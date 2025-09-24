"use client";

import { X, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface FilterConfig {
  id: string;
  label: string;
  placeholder?: string;
  type: "select" | "combobox" | "search";
  options?: FilterOption[];
  multiple?: boolean;
}

export interface FilterToolbarProps {
  filters: FilterConfig[];
  values: Record<string, any>;
  onFilterChange: (filterId: string, value: any) => void;
  onReset?: () => void;
  className?: string;
  showActiveFilters?: boolean;
}

export function FilterToolbar({
  filters,
  values,
  onFilterChange,
  onReset,
  className,
  showActiveFilters = true,
}: FilterToolbarProps) {
  const [openCombobox, setOpenCombobox] = useState<string | null>(null);

  const activeFilters = Object.entries(values).filter(
    ([key, value]) => {
      const filter = filters.find(f => f.id === key);
      if (filter?.type === "search") {
        return value && value.trim() !== "";
      }
      if (filter?.multiple) {
        return Array.isArray(value) && value.length > 0;
      }
      return value && value !== "all";
    }
  );

  const handleRemoveFilter = (filterId: string, value?: string) => {
    const filter = filters.find(f => f.id === filterId);

    if (filter?.multiple && value) {
      const currentValues = values[filterId] as string[];
      onFilterChange(
        filterId,
        currentValues.filter(v => v !== value)
      );
    } else {
      onFilterChange(filterId, filter?.type === "search" ? "" : "all");
    }
  };

  const renderFilter = (filter: FilterConfig) => {
    const value = values[filter.id];

    switch (filter.type) {
      case "search":
        return (
          <div key={filter.id} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mist-400 pointer-events-none" />
            <Input
              type="search"
              placeholder={filter.placeholder || filter.label}
              className="control-glass w-[250px] pl-10 pr-4 py-[var(--space-xs)] rounded-full text-white placeholder-mist-400 border-white/20 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-[#D64218]/50"
              value={value || ""}
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
            />
          </div>
        );

      case "select":
        return (
          <Select
            key={filter.id}
            value={value || "all"}
            onValueChange={(val) => onFilterChange(filter.id, val)}
          >
            <SelectTrigger className="control-glass w-[180px] text-white border-white/20 rounded-full">
              <SelectValue placeholder={filter.placeholder || filter.label} />
            </SelectTrigger>
            <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
              <SelectItem value="all" className="text-white hover:bg-white/10 focus:bg-white/10">
                Все
              </SelectItem>
              {filter.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-white hover:bg-white/10 focus:bg-white/10"
                >
                  <span className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "combobox":
        const isOpen = openCombobox === filter.id;
        const selectedValues = filter.multiple
          ? (value as string[]) || []
          : value ? [value] : [];

        return (
          <Popover
            key={filter.id}
            open={isOpen}
            onOpenChange={(open) => setOpenCombobox(open ? filter.id : null)}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isOpen}
                className="control-glass w-[200px] justify-between text-white border-white/20 rounded-full hover:bg-white/10"
              >
                <span className="truncate">
                  {selectedValues.length > 0
                    ? filter.multiple
                      ? `${selectedValues.length} выбрано`
                      : filter.options?.find(o => o.value === value)?.label
                    : filter.placeholder || filter.label}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-black/90 backdrop-blur-xl border-white/20">
              <Command className="bg-transparent">
                <CommandInput
                  placeholder={`Поиск ${filter.label.toLowerCase()}...`}
                  className="text-white placeholder-mist-400"
                />
                <CommandList>
                  <CommandEmpty className="text-mist-400 py-6 text-center text-sm">
                    Ничего не найдено
                  </CommandEmpty>
                  <CommandGroup>
                    {filter.options?.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          if (filter.multiple) {
                            const newValues = selectedValues.includes(currentValue)
                              ? selectedValues.filter(v => v !== currentValue)
                              : [...selectedValues, currentValue];
                            onFilterChange(filter.id, newValues);
                          } else {
                            onFilterChange(filter.id, currentValue === value ? "" : currentValue);
                            setOpenCombobox(null);
                          }
                        }}
                        className="text-white hover:bg-white/10"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValues.includes(option.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span className="flex items-center gap-2">
                          {option.icon}
                          {option.label}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {filters.map(renderFilter)}

        {onReset && activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-mist-300 hover:text-white hover:bg-white/10 rounded-full px-[var(--space-md)]"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Сброс
          </Button>
        )}
      </div>

      {showActiveFilters && activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <span className="text-xs text-mist-400 mr-2">Активные фильтры:</span>
          {activeFilters.map(([filterId, value]) => {
            const filter = filters.find(f => f.id === filterId);

            if (filter?.multiple && Array.isArray(value)) {
              return value.map(v => {
                const option = filter.options?.find(o => o.value === v);
                return (
                  <Badge
                    key={`${filterId}-${v}`}
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                    onClick={() => handleRemoveFilter(filterId, v)}
                  >
                    {option?.label || v}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                );
              });
            }

            const option = filter?.options?.find(o => o.value === value);
            const label = filter?.type === "search"
              ? `Поиск: "${value}"`
              : option?.label || value;

            return (
              <Badge
                key={filterId}
                variant="secondary"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => handleRemoveFilter(filterId)}
              >
                {filter?.label}: {label}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}