// src/components/SearchForm/AdvancedFiltersSection.tsx
import { SearchParams } from "@/types/types";
import { DateFilterOption, KeywordFilterOption } from "@/types/enums";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCcw, ChevronDown } from "lucide-react";
import { CountrySelector } from "./CountrySelector";
import { MaxResultsSelector } from "./MaxResultsSelector";
import { MinViewsInput } from "./MinViewsInput";
import { DateRangeSelector } from "./DateRangeSelector";
import { CustomDatePickers } from "./CustomDatePickers";
import { KeywordFilterSelector } from "./KeywordFilterSelector";
import { ExcludedChannelsInput } from "./ExcludedChannelsInput";
import { MaxResultsWarning } from "./MaxResultsWarning";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeywordFilterWarning } from "./KeywordFilterWarning";

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
  // State for collapsible sections - all closed by default
  const [openSections, setOpenSections] = useState({
    content: false,
    dateLocation: false,
    channelExclusion: false,
  });

  // Toggle section visibility
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  // Handle custom date visibility
  const showCustomDatePickers =
    formData.date_filter === DateFilterOption.CUSTOM;

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

  // Animation variants
  const accordionVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto" },
  };

  const showMaxResultsWarning = formData.max_results > 50;

  return (
    <div className="border rounded-lg shadow-sm dark:shadow-none dark:border-border bg-card overflow-hidden">
      {/* Header with title and reset button */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-muted/30">
        <h3 className="text-base font-medium flex items-center">
          <Filter className="h-4 w-4 mr-2 text-primary" />
          Advanced Search Filters
        </h3>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-muted-foreground cursor-pointer hover:text-foreground text-sm"
          >
            <RefreshCcw className="mr-2 h-3 w-3" />
            Reset to Defaults
          </Button>
        </motion.div>
      </div>

      <div className="divide-y divide-border">
        {/* CONTENT FILTERS */}
        <div className="bg-card">
          <motion.button
            className="w-full flex justify-between items-center px-6 py-3 text-left hover:bg-accent/40 transition-colors"
            onClick={() => toggleSection("content")}
            whileHover={{ backgroundColor: "rgba(var(--accent)/0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            <h4 className="font-medium text-sm flex items-center text-foreground">
              Content Filters
            </h4>
            <motion.div
              animate={{ rotate: openSections.content ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {openSections.content && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={accordionVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-3">
                  {/* Warning about max results */}
                  <MaxResultsWarning
                    visible={showMaxResultsWarning}
                    value={formData.max_results}
                  />

                  {/* Warning about keyword filter */}
                  <KeywordFilterWarning
                    visible={openSections.content} // Only pass the section visibility, let component handle filter type
                    filterType={
                      formData.keyword_filter || KeywordFilterOption.ANY
                    }
                  />

                  {/* Single row for min views, keyword filter, and max results */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-2">
                    {/* All components in this row are styled to have the same height */}
                    <div className="flex flex-col h-full">
                      <MinViewsInput
                        value={formData.min_views}
                        onChange={(value) =>
                          setFormData({ ...formData, min_views: value })
                        }
                      />
                    </div>

                    <div className="flex flex-col h-full">
                      <KeywordFilterSelector
                        value={
                          formData.keyword_filter || KeywordFilterOption.ANY
                        }
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            keyword_filter: value,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-col h-full">
                      <MaxResultsSelector
                        value={formData.max_results}
                        onChange={(value) =>
                          setFormData({ ...formData, max_results: value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DATE & LOCATION FILTERS */}
        <div className="bg-card">
          <motion.button
            className="w-full flex justify-between items-center px-6 py-3 text-left hover:bg-accent/40 transition-colors"
            onClick={() => toggleSection("dateLocation")}
            whileHover={{ backgroundColor: "rgba(var(--accent)/0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            <h4 className="font-medium text-sm flex items-center text-foreground">
              Date & Location
            </h4>
            <motion.div
              animate={{ rotate: openSections.dateLocation ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {openSections.dateLocation && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={accordionVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Country */}
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

                    {/* Custom Date Pickers - Better layout when visible */}
                    <AnimatePresence>
                      {showCustomDatePickers && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 mt-1"
                        >
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
                              setFormData({ ...formData, custom_date_to: date })
                            }
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CHANNEL EXCLUSION */}
        <div className="bg-card">
          <motion.button
            className="w-full flex justify-between items-center px-6 py-3 text-left hover:bg-accent/40 transition-colors"
            onClick={() => toggleSection("channelExclusion")}
            whileHover={{ backgroundColor: "rgba(var(--accent)/0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            <h4 className="font-medium text-sm flex items-center text-foreground">
              Channel Exclusion
            </h4>
            <motion.div
              animate={{ rotate: openSections.channelExclusion ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {openSections.channelExclusion && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={accordionVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-3">
                  <ExcludedChannelsInput
                    values={formData.excluded_channels || []}
                    onChange={(values) =>
                      setFormData({
                        ...formData,
                        excluded_channels: values,
                      })
                    }
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
