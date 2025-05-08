// src/components/SearchForm.tsx
"use client";

import { useState, useEffect } from "react";
import { SearchFormProps, SearchParams } from "@/types/types";
import { DateFilterOption } from "@/types/enums";

import { PrimarySearchField } from "./SearchForm/PrimarySearchField";
import { FiltersToggleButton } from "./SearchForm/FiltersToggleButton";
import { AdvancedFiltersSection } from "./SearchForm/AdvancedFiltersSection";
import { SearchTips } from "./SearchForm/SearchTips";
import { SearchButton } from "./SearchForm/SearchButton";
import { CompareButton } from "./SearchForm/CompareButton";

export default function SearchForm({
  onSearch,
  isLoading,
  initialSearchParams,
  onCompare,
  hasResults = false,
}: SearchFormProps) {
  const [formData, setFormData] = useState<SearchParams>({
    brand_name: "",
    max_results: 10,
    min_views: 1000,
    date_filter: DateFilterOption.ALL_TIME,
    country_code: "",
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Update form data when initialSearchParams changes
  useEffect(() => {
    if (initialSearchParams) {
      setFormData(initialSearchParams);
    }
  }, [initialSearchParams]);

  // Calculate active filter count for the badge
  const activeFilterCount = Object.entries(formData).filter(([key, value]) => {
    if (key === "brand_name") return false;
    if (value === "" || value === undefined) return false;
    if (key === "min_views" && value === 1000) return false;
    if (key === "max_results" && value === 30) return false;
    if (key === "date_filter" && value === DateFilterOption.ALL_TIME)
      return false;
    return true;
  }).length;

  // Reset filters to default values
  const resetFilters = () => {
    setFormData({
      brand_name: formData.brand_name, // Preserve brand name
      max_results: 30,
      min_views: 1000,
      date_filter: DateFilterOption.ALL_TIME,
      country_code: "",
      custom_date_from: undefined,
      custom_date_to: undefined,
    });
  };

  const handleSearch = () => {
    // Create a copy of the form data for submission
    const searchParams = { ...formData };

    // If using custom dates, ensure they're in the correct format for the YouTube API
    if (formData.date_filter === DateFilterOption.CUSTOM) {
      // Only include dates if they are actually set
      if (formData.custom_date_from) {
        // Clone the date to avoid modifying the original
        const fromDate = new Date(formData.custom_date_from);
        // Set time to 00:00:00 for the from date
        fromDate.setHours(0, 0, 0, 0);
        searchParams.custom_date_from = fromDate;

        // Log the formatted date for debugging
        console.log("From Date:", fromDate.toISOString());
      }

      if (formData.custom_date_to) {
        // Clone the date to avoid modifying the original
        const toDate = new Date(formData.custom_date_to);
        // Set time to 23:59:59 for the to date (but don't use milliseconds)
        toDate.setHours(23, 59, 59, 0);
        searchParams.custom_date_to = toDate;

        // Log the formatted date for debugging
        console.log("To Date:", toDate.toISOString());
      }
    }

    onSearch(searchParams);
  };

  return (
    <div className="space-y-8">
      {/* Search Bar and Primary Button */}
      <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border border-primary/10 dark:border-primary/20">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Brand Name Input - The Primary Search Field */}
          <PrimarySearchField
            value={formData.brand_name}
            onChange={(value) =>
              setFormData({ ...formData, brand_name: value })
            }
          />

          {/* Filters Toggle Button */}
          <FiltersToggleButton
            isOpen={isFiltersOpen}
            filterCount={activeFilterCount}
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          />

          {/* Main Search Button */}
          <div className="flex flex-col sm:flex-row gap-2 lg:self-end">
            <SearchButton
              onClick={handleSearch}
              isLoading={isLoading}
              disabled={!formData.brand_name}
            />

            {/* Compare Brands Button (only shown if onCompare handler is provided) */}
            {onCompare && (
              <CompareButton onClick={onCompare} disabled={!hasResults} />
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters Section - Collapsible */}
      {isFiltersOpen && (
        <AdvancedFiltersSection
          formData={formData}
          setFormData={setFormData}
          onReset={resetFilters}
        />
      )}

      {/* Search guidelines */}
      <SearchTips />
    </div>
  );
}
