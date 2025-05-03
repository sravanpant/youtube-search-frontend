// components/SearchForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
// import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchParams } from "@/types/types";
import { Card } from "@/components/ui/card";

export default function SearchForm({
  onSearch,
  isLoading,
}: {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}) {
  // const [formData, setFormData] = useState<SearchParams>({
  //   brand_name: "",
  //   max_results: 10,
  //   location: "",
  //   min_views: 1000,
  //   channel_name: "",
  //   upload_date_after: "",
  //   upload_date_before: "",
  // });
  const [formData, setFormData] = useState<SearchParams>({
    brand_name: "",
    max_results: 10,
    min_views: 1000,
  });

  const maxResultsOptions = [10, 20, 30, 50, 100];

  return (
    <Card className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Row */}
        <div className="space-y-2">
          <Label htmlFor="brand_name">Brand Name</Label>
          <Input
            id="brand_name"
            value={formData.brand_name}
            onChange={(e) =>
              setFormData({ ...formData, brand_name: e.target.value })
            }
            placeholder="Enter brand name"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_results">Max Results</Label>
          <Select
            value={formData.max_results.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, max_results: parseInt(value) })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select max results" />
            </SelectTrigger>
            <SelectContent>
              {maxResultsOptions.map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="channel_name">Channel Name</Label>
          <Input
            id="channel_name"
            value={formData.channel_name}
            onChange={(e) =>
              setFormData({ ...formData, channel_name: e.target.value })
            }
            placeholder="Enter channel name"
            className="w-full"
          />
        </div> */}

        {/* <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Enter location"
            className="w-full"
          />
        </div> */}

        {/* Second Row */}
        <div className="space-y-2">
          <Label htmlFor="min_views">Min Views</Label>
          <Input
            id="min_views"
            type="number"
            value={formData.min_views}
            onChange={(e) =>
              setFormData({ ...formData, min_views: parseInt(e.target.value) })
            }
            placeholder="Enter minimum views"
            className="w-full"
          />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="upload_date_after">Upload Date After</Label>
          <div className="relative">
            <DatePicker
              id="upload_date_after"
              onChange={(date) =>
                setFormData({
                  ...formData,
                  upload_date_after: date ? date.toISOString() : "",
                })
              }
              className="w-full"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
          </div>
        </div> */}

        {/* Third Row */}
        {/* <div className="space-y-2">
          <Label htmlFor="upload_date_before">Upload Date Before</Label>
          <div className="relative">
            <DatePicker
              id="upload_date_before"
              onChange={(date) =>
                setFormData({
                  ...formData,
                  upload_date_before: date ? date.toISOString() : "",
                })
              }
              className="w-full"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
          </div>
        </div> */}
      </div>

      <Button
        onClick={() => onSearch(formData)}
        className="w-full cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          "Search Videos"
        )}
      </Button>
    </Card>
  );
}
