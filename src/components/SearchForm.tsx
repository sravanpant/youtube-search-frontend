// components/SearchForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Loader2,
  RefreshCcw,
  Globe,
  Calendar,
  BarChart2,
  Eye,
  Clock,
  Info,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchParams } from "@/types/types";
import { DateFilterOption } from "@/types/enums";

import { DatePicker } from "@/components/ui/date-picker";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// Country data array for the dropdown
const COUNTRIES = [
  { code: "ANY", name: "Any Country" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "KR", name: "South Korea" },
  { code: "RU", name: "Russia" },
  { code: "ZA", name: "South Africa" },
  { code: "SG", name: "Singapore" },
  { code: "PH", name: "Philippines" },
];

export default function SearchForm({
  onSearch,
  isLoading,
}: {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<SearchParams>({
    brand_name: "",
    max_results: 10,
    min_views: 1000,
    date_filter: DateFilterOption.ALL_TIME,
    country_code: "",
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const maxResultsOptions = [10, 20, 30, 50, 100, 200, 500];

  // Handle custom date visibility
  const showCustomDatePickers =
    formData.date_filter === DateFilterOption.CUSTOM;

  const activeFilterCount = Object.entries(formData).filter(([key, value]) => {
    if (key === "brand_name") return false; // Don't count brand name
    if (value === "" || value === undefined) return false;
    if (key === "min_views" && value === 1000) return false; // Don't count default
    if (key === "max_results" && value === 30) return false; // Don't count default
    if (key === "date_filter" && value === DateFilterOption.ALL_TIME)
      return false; // Don't count default
    return true;
  }).length;

  return (
    <div className="space-y-8">
      {/* Search Bar and Primary Button */}
      <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border border-primary/10 dark:border-primary/20">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Brand Name Input - The Primary Search Field */}
          <div className="flex-grow">
            <Label
              htmlFor="brand_name"
              className="text-sm font-medium mb-2 flex items-center"
            >
              <Search className="h-4 w-4 mr-2 text-primary" />
              Brand Name
              <Badge
                variant="outline"
                className="ml-2 font-normal bg-primary/10 text-primary dark:bg-primary/20 border-0"
              >
                Required
              </Badge>
            </Label>
            <div className="relative">
              <Input
                id="brand_name"
                value={formData.brand_name}
                onChange={(e) =>
                  setFormData({ ...formData, brand_name: e.target.value })
                }
                placeholder="Enter brand name to search"
                className="w-full h-11 pl-4 pr-12 text-base shadow-sm border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                {formData.brand_name ? (
                  <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-0 cursor-default">
                    Brand
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground italic">
                    Required
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Filters Toggle Button */}
          <div className="lg:self-end">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full lg:w-auto h-11 flex items-center justify-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <Badge className="ml-1 bg-primary text-primary-foreground">
                  {activeFilterCount}
                </Badge>
              )}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isFiltersOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>

          {/* Main Search Button - Single Clear Action */}
          <div className="lg:self-end">
            <Button
              onClick={() => onSearch(formData)}
              className="w-full lg:w-auto h-11 px-8 text-base bg-primary hover:bg-primary/90 text-white transition-colors shadow-md"
              disabled={isLoading || !formData.brand_name}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Search Videos
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Section - Collapsible */}
      {isFiltersOpen && (
        <div className="border rounded-lg shadow-sm dark:shadow-none dark:border-border p-6 space-y-6 bg-background">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium flex items-center">
              <Filter className="h-4 w-4 mr-2 text-primary" />
              Advanced Search Filters
            </h3>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setFormData({
                  brand_name: formData.brand_name, // Preserve brand name
                  max_results: 30,
                  min_views: 1000,
                  date_filter: DateFilterOption.ALL_TIME,
                  country_code: "",
                  custom_date_from: undefined,
                  custom_date_to: undefined,
                })
              }
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              <RefreshCcw className="mr-2 h-3 w-3" />
              Reset to Defaults
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {/* Max Results */}
            <div className="space-y-1.5">
              <Label
                htmlFor="max_results"
                className="text-sm font-medium flex items-center"
              >
                <BarChart2 className="h-4 w-4 mr-2 text-muted-foreground" />
                Maximum Results
              </Label>
              <Select
                value={formData.max_results.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, max_results: parseInt(value) })
                }
              >
                <SelectTrigger className="w-full h-10 bg-background border-input focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select max results" />
                </SelectTrigger>
                <SelectContent>
                  {maxResultsOptions.map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} videos
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Views */}
            <div className="space-y-1.5">
              <Label
                htmlFor="min_views"
                className="text-sm font-medium flex items-center"
              >
                <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                Minimum Views
              </Label>
              <Input
                id="min_views"
                type="number"
                value={formData.min_views}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    min_views: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Enter minimum views"
                className="h-10 bg-background border-input focus:ring-0 focus:ring-offset-0"
              />
            </div>

            {/* Country Selector */}
            <div className="space-y-1.5">
              <Label
                htmlFor="country_code"
                className="text-sm font-medium flex items-center"
              >
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                Country
              </Label>
              <Select
                value={formData.country_code || "ANY"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    country_code: value === "ANY" ? "" : value,
                  })
                }
              >
                <SelectTrigger className="w-full h-10 bg-background border-input focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  <SelectGroup>
                    <SelectLabel className="text-xs text-muted-foreground">
                      Global
                    </SelectLabel>
                    <SelectItem value="ANY">Any Country</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className="text-xs text-muted-foreground">
                      Top Countries
                    </SelectLabel>
                    {COUNTRIES.slice(1, 7).map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div className="space-y-1.5">
              <Label
                htmlFor="date_filter"
                className="text-sm font-medium flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                Date Filter
              </Label>
              <Select
                value={formData.date_filter || DateFilterOption.ALL_TIME}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    date_filter: value as DateFilterOption,
                    ...(value !== DateFilterOption.CUSTOM && {
                      custom_date_from: undefined,
                      custom_date_to: undefined,
                    }),
                  })
                }
              >
                <SelectTrigger className="w-full h-10 bg-background border-input focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-xs text-muted-foreground">
                      Recent
                    </SelectLabel>
                    <SelectItem value={DateFilterOption.PAST_HOUR}>
                      Past Hour
                    </SelectItem>
                    <SelectItem value={DateFilterOption.PAST_24_HOURS}>
                      Past 24 Hours
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className="text-xs text-muted-foreground">
                      Longer Periods
                    </SelectLabel>
                    <SelectItem value={DateFilterOption.PAST_7_DAYS}>
                      Past 7 Days
                    </SelectItem>
                    <SelectItem value={DateFilterOption.PAST_30_DAYS}>
                      Past 30 Days
                    </SelectItem>
                    <SelectItem value={DateFilterOption.PAST_90_DAYS}>
                      Past 90 Days
                    </SelectItem>
                    <SelectItem value={DateFilterOption.ALL_TIME}>
                      All Time
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className="text-xs text-muted-foreground">
                      Advanced
                    </SelectLabel>
                    <SelectItem value={DateFilterOption.CUSTOM}>
                      Custom Range
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Only show custom date fields if needed */}
            {showCustomDatePickers && (
              <>
                {/* From Date */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="custom_date_from"
                    className="text-sm font-medium flex items-center"
                  >
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    From Date
                  </Label>
                  <DatePicker
                    id="custom_date_from"
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        custom_date_from: date,
                      })
                    }
                    className="h-10 bg-background border-input focus:ring-0 focus:ring-offset-0"
                  />
                </div>

                {/* To Date */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="custom_date_to"
                    className="text-sm font-medium flex items-center"
                  >
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    To Date
                  </Label>
                  <DatePicker
                    id="custom_date_to"
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        custom_date_to: date,
                      })
                    }
                    className="h-10 bg-background border-input focus:ring-0 focus:ring-offset-0"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Search guidelines */}
      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 mt-6">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 flex items-center">
          <Info className="h-4 w-4 mr-2 text-zinc-500 dark:text-zinc-400" />
          Search Tips
        </h3>
        <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 pl-5 list-disc marker:text-zinc-400 dark:marker:text-zinc-500">
          <li>Enter a specific brand name for more accurate results</li>
          <li>Use country filters to narrow down by geographic relevance</li>
          <li>Higher minimum view counts will return more popular videos</li>
          <li>Custom date ranges help find time-specific campaigns</li>
        </ul>
      </div>

      {/* Enterprise Info Card */}
      {/* <div className="flex items-center justify-between px-5 py-4 bg-muted/50 rounded-lg border border-border/80 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Info className="h-4 w-4 mr-2 text-primary" />
          <span>Enterprise search includes enhanced analytics and deep content scanning</span>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary dark:bg-primary/20 border-0">
          Enterprise Feature
        </Badge>
      </div> */}
    </div>
  );
}

// Helper function to convert country code to flag emoji
// function getCountryFlag(countryCode: string) {
//   if (countryCode === "ANY") return "";

//   // Convert country code to flag emoji (works for most 2-letter country codes)
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt(0));

//   return String.fromCodePoint(...codePoints);
// }
