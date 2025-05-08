// frontend/src/components/SearchForm/SearchTips.tsx
import { Info } from "lucide-react";

export function SearchTips() {
  return (
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
  );
}