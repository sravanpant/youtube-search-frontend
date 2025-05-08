// frontend/src/components/SearchForm/AdvancedFiltersSection.tsx (updated)
import { SearchParams } from "@/types/types";
import { DateFilterOption } from "@/types/enums";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCcw } from "lucide-react";
import { CountrySelector } from "./CountrySelector";
import { MaxResultsSelector } from "./MaxResultsSelector";
import { MinViewsInput } from "./MinViewsInput";
import { DateRangeSelector } from "./DateRangeSelector";
import { CustomDatePickers } from "./CustomDatePickers";

interface AdvancedFiltersSectionProps {
  formData: SearchParams;
  setFormData: (formData: SearchParams) => void;
  onReset: () => void;
}

export function AdvancedFiltersSection({
  formData,
  setFormData,
  onReset,
}: AdvancedFiltersSectionProps) {
  // Handle custom date visibility
  const showCustomDatePickers = formData.date_filter === DateFilterOption.CUSTOM;
  
  // Handle date filter change
  const handleDateFilterChange = (value: DateFilterOption) => {
    setFormData({
      ...formData,
      date_filter: value,
      ...(value !== DateFilterOption.CUSTOM && {
        custom_date_from: undefined,
        custom_date_to: undefined,
      }),
    });
  };

  return (
    <div className="border rounded-lg shadow-sm dark:shadow-none dark:border-border p-6 space-y-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium flex items-center">
          <Filter className="h-4 w-4 mr-2 text-primary" />
          Advanced Search Filters
        </h3>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          <RefreshCcw className="mr-2 h-3 w-3" />
          Reset to Defaults
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {/* Max Results */}
        <MaxResultsSelector 
          value={formData.max_results}
          onChange={(value) => setFormData({ ...formData, max_results: value })}
        />

        {/* Min Views */}
        <MinViewsInput
          value={formData.min_views}
          onChange={(value) => setFormData({ ...formData, min_views: value })}
        />

        {/* Country Selector */}
        <CountrySelector
          value={formData.country_code || "ANY"}
          onChange={(value) => 
            setFormData({
              ...formData,
              country_code: value === "ANY" ? "" : value,
            })
          }
        />

        {/* Date Filter */}
        <DateRangeSelector
          value={formData.date_filter || DateFilterOption.ALL_TIME}
          onChange={handleDateFilterChange}
        />

        {/* Only show custom date fields if needed */}
        {showCustomDatePickers && (
          <CustomDatePickers
            fromDate={formData.custom_date_from}
            toDate={formData.custom_date_to}
            onFromDateChange={(date) => 
              setFormData({
                ...formData,
                custom_date_from: date,
              })
            }
            onToDateChange={(date) => 
              setFormData({
                ...formData,
                custom_date_to: date,
              })
            }
          />
        )}
      </div>
    </div>
  );
}