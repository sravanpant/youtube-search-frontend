// frontend/src/components/TableSkeleton.tsx
export function TableSkeleton() {
  // Column headers that match your actual table
  const headers = [
    "Title", "Channel", "Views", "Likes", "Subscribers", 
    "Length", "Published", "Brand Links"
  ];

  return (
    <div className="space-y-4">
      {/* Top controls - entries per page and export */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <div className="w-[100px] h-8 bg-gray-200 rounded animate-pulse" />
          <span className="text-sm text-muted-foreground">entries per page</span>
        </div>
        
        {/* Export button skeleton */}
        <div className="h-9 w-28 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table header */}
            <thead className="border-b bg-muted/50">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="px-4 py-3">
                    <div className="flex items-center justify-start gap-1">
                      <span>{header}</span>
                      <div className="h-4 w-4 opacity-50" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* Table body with skeleton rows */}
            <tbody className="divide-y divide-border">
              {[...Array(10)].map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-muted/50">
                  {/* Title cell */}
                  <td className="px-4 py-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-[250px]" />
                  </td>
                  
                  {/* Channel cell */}
                  <td className="px-4 py-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-[150px]" />
                  </td>
                  
                  {/* Views cell */}
                  <td className="px-4 py-3 text-center">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-[70px] mx-auto" />
                  </td>
                  
                  {/* Likes cell */}
                  <td className="px-4 py-3 text-center">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-[60px] mx-auto" />
                  </td>
                  
                  {/* Subscribers cell */}
                  <td className="px-4 py-3 text-center">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-[80px] mx-auto" />
                  </td>
                  
                  {/* Length cell */}
                  <td className="px-4 py-3 text-center">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-[40px] mx-auto" />
                  </td>
                  
                  {/* Published cell */}
                  <td className="px-4 py-3 text-center">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-[90px] mx-auto" />
                  </td>
                  
                  {/* Brand Links cell */}
                  <td className="px-4 py-3 text-center">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-[60px] mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between px-2 py-3">
        <div className="h-5 w-60 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center space-x-1">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-8 w-10 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}