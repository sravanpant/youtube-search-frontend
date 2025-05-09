// frontend/src/components/SearchForm/PrimarySearchField.tsx
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface PrimarySearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function PrimarySearchField({ value, onChange }: PrimarySearchFieldProps) {
  return (
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter brand name to search"
          className="w-full h-11 pl-4 pr-12 text-base shadow-sm border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          {value ? (
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
  );
}