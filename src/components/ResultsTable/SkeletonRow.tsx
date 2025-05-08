// frontend/src/components/ResultsTable/SkeletonRow.tsx
export const SkeletonRow = () => {
    return (
      <tr className="hover:bg-muted/50">
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
    );
  };