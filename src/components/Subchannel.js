import React from 'react';
import { Folder, FolderOpen, ChevronRight, Loader2 } from 'lucide-react';
import ArenaItem from './ArenaItem';

const Subchannel = ({
  subchannel,
  isExpanded,
  contents,
  isLoading,
  onToggle
}) => {
  return (
    <div className="flex border border-[#dddddd] rounded-md overflow-visible hover:shadow-sm transition-shadow h-24">
      <button
        onClick={() => onToggle(subchannel.id)}
        className="flex-none w-48 p-2 text-left hover:bg-[#f8f8f8] transition-colors group flex flex-col justify-center"
      >
        <div className="flex items-center space-x-1.5 mb-1">
          {isExpanded ? (
            <ChevronRight className="h-3 w-3 text-[#888888]" />
          ) : (
            <ChevronRight className="h-3 w-3 text-[#888888]" />
          )}
          {isExpanded ? (
            <FolderOpen className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <Folder className="h-3.5 w-3.5 text-[#888888]" />
          )}
          <h3 className="font-medium text-xs text-[#001122] group-hover:text-green-400 transition-colors line-clamp-1">
            {subchannel.title}
          </h3>
        </div>
        <div className="flex items-center space-x-1.5 pl-5">
          {subchannel.description && (
            <p className="text-[10px] text-[#888888] line-clamp-1 flex-1">
              {subchannel.description}
            </p>
          )}
          <span className="text-[10px] text-[#888888] bg-[#f8f8f8] px-1 py-0.5 rounded flex-shrink-0">
            {subchannel.length || 0}
          </span>
        </div>
      </button>

      {/* Expanded subchannel contents */}
      {isExpanded && (
        <div className="flex-1 px-2 py-0 border-l border-[#dddddd] bg-[#fafafa] overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-4 w-4 animate-spin text-green-400 mr-2" />
              <span className="text-xs text-[#888888]">Loading...</span>
            </div>
          ) : (
            <div className="overflow-x-auto overflow-y-hidden h-full flex items-stretch">
              {contents && Array.isArray(contents) && contents.length > 0 ? (
                <div className="flex flex-row flex-nowrap gap-2">
                  {contents.map((item) => (
                    <div key={item.id} className="flex-none w-40 h-full">
                      <ArenaItem item={item} isSubchannel={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center w-full text-xs text-[#888888]">
                  No contents
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Subchannel;