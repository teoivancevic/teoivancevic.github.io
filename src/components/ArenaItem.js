import React from 'react';
import { ExternalLink, Image as ImageIcon, FileText, Video, Music } from 'lucide-react';

const ArenaItem = ({ item, isSubchannel = false }) => {
  const getItemIcon = (item) => {
    switch (item.class) {
      case 'Image':
        return <ImageIcon className="h-4 w-4" />;
      case 'Text':
        return <FileText className="h-4 w-4" />;
      case 'Video':
        return <Video className="h-4 w-4" />;
      case 'Audio':
        return <Music className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const isTextItem = item.class === 'Text';
  const containerClass = isSubchannel
    ? "border border-[#dddddd] rounded-sm overflow-hidden hover:shadow-sm transition-shadow group bg-white h-full flex flex-col"
    : "border border-[#dddddd] rounded-md overflow-hidden hover:shadow-sm transition-shadow group";

  const titleClass = isSubchannel
    ? "font-medium text-[10px] text-[#001122] group-hover:text-green-400 transition-colors line-clamp-1"
    : "font-medium text-sm text-[#001122] group-hover:text-green-400 transition-colors line-clamp-1";

  const descriptionClass = isSubchannel
    ? "text-[9px] text-[#888888] line-clamp-1 mb-0.5"
    : "text-xs text-[#888888] line-clamp-1 mb-2";

  const contentClass = isSubchannel
    ? "text-[9px] text-[#888888] mb-0.5 prose prose-xs max-w-none"
    : "text-xs text-[#888888] mb-2 prose prose-xs max-w-none";

  return (
    <div className={containerClass}>
      {isTextItem ? (
        /* Text item - no image, show content directly */
        <>
          {isSubchannel && (
            <div className="flex-1 min-h-0 bg-[#f8f8f8] overflow-hidden flex items-center justify-center text-[#888888]">
              {getItemIcon(item)}
            </div>
          )}
          <div className={isSubchannel ? "p-1.5 flex-none flex flex-col" : "p-3"}>
          <div className="flex items-start justify-between mb-0.5">
            <h3 className={titleClass}>
              {item.title}
            </h3>
            <div className={`flex items-center text-[#888888] ml-1 flex-shrink-0 ${isSubchannel ? 'h-2.5 w-2.5' : ''}`}>
              {getItemIcon(item)}
            </div>
          </div>
          {item.content && !isSubchannel && (
            <div className={contentClass}>
              <div dangerouslySetInnerHTML={{ __html: item.content_html || item.content }} />
            </div>
          )}
          {item.description && !isSubchannel && (
            <p className={descriptionClass}>
              {item.description}
            </p>
          )}
          <div className={`flex items-center justify-end ${isSubchannel ? 'mt-auto pt-1' : 'mt-1'}`}>
            {item.source?.url && (
              <a
                href={item.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888888] hover:text-green-400 transition-colors"
              >
                <ExternalLink className={isSubchannel ? "h-2.5 w-2.5" : "h-3 w-3"} />
              </a>
            )}
          </div>
          </div>
        </>
      ) : (
        /* Non-text item - show image */
        <>
          <div className={isSubchannel ? "flex-1 min-h-0 bg-[#f8f8f8] overflow-hidden" : "aspect-video bg-[#f8f8f8] overflow-hidden"}>
            {item.image?.thumb?.url ? (
              <img
                src={item.image.thumb.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#888888]">
                {getItemIcon(item)}
              </div>
            )}
          </div>
          <div className={isSubchannel ? "p-1.5 flex-none flex flex-col" : "p-3"}>
            <div className="flex items-start justify-between mb-0.5">
              <h3 className={titleClass}>
                {item.title}
              </h3>
              <div className={`flex items-center text-[#888888] ml-1 flex-shrink-0 ${isSubchannel ? 'h-2.5 w-2.5' : ''}`}>
                {getItemIcon(item)}
              </div>
            </div>
            {item.description && !isSubchannel && (
              <p className={descriptionClass}>
                {item.description}
              </p>
            )}
            <div className={`flex items-center justify-end ${isSubchannel ? 'mt-auto pt-1' : 'mt-1'}`}>
              {item.source?.url && (
                <a
                  href={item.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888888] hover:text-green-400 transition-colors"
                >
                  <ExternalLink className={isSubchannel ? "h-2.5 w-2.5" : "h-3 w-3"} />
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArenaItem;