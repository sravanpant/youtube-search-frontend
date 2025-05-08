// frontend/src/components/SearchForm/CountrySelector.tsx
import { Globe } from "lucide-react";
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

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="country_code"
        className="text-sm font-medium flex items-center"
      >
        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
        Country
      </Label>
      <Select value={value} onValueChange={onChange}>
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
          <SelectGroup>
            <SelectLabel className="text-xs text-muted-foreground">
              All Countries
            </SelectLabel>
            {COUNTRIES.slice(7).map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}