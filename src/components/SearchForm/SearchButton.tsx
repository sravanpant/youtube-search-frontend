// src/components/SearchForm/SearchButton.tsx
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

interface SearchButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export function SearchButton({ onClick, isLoading, disabled }: SearchButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="h-11 px-5 text-base bg-primary hover:bg-primary/90 text-white transition-colors"
      disabled={disabled || isLoading}
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
  );
}