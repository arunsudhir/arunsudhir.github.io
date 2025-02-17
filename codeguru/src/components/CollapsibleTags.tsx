import React, { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { ProblemTag, TagMetadata, TAG_METADATA } from '../data/types';

interface CollapsibleTagsProps {
  currentTags: ProblemTag[];
  selectedTags: ProblemTag[];
  onTagSelect: (tag: ProblemTag) => void;
  onTagDeselect: (tag: ProblemTag) => void;
}

const CollapsibleTags = ({ 
  currentTags,
  selectedTags,
  onTagSelect,
  onTagDeselect
}: CollapsibleTagsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortedTags = Object.entries(TAG_METADATA)
    .map(([tag, metadata]) => ({
      tag: tag as ProblemTag,
      metadata,
      isSelected: selectedTags.includes(tag as ProblemTag)
    }))
    .sort((a, b) => a.metadata.label.localeCompare(b.metadata.label));

  return (
    <div className="w-full">
      {/* Selected Tags Display */}
      <div className="mb-2 flex flex-wrap gap-1.5">
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-gray-500 font-medium">Filters:</span>
            {selectedTags.map(tag => (
              <div
                key={tag}
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${TAG_METADATA[tag].color}
                  flex items-center gap-1
                `}
              >
                {TAG_METADATA[tag].label}
                <button
                  onClick={() => onTagDeselect(tag)}
                  className="hover:bg-black/10 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collapsible Tag Selector */}
      <div className="border rounded-md bg-white shadow-sm">
        <Collapsible.Root
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full"
        >
          <Collapsible.Trigger className="w-full text-left px-2.5 py-1.5 hover:bg-gray-50 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {isOpen ? (
                <ChevronDown className="w-3 h-3 text-gray-400" />
              ) : (
                <ChevronRight className="w-3 h-3 text-gray-400" />
              )}
              <span className="text-xs font-medium text-gray-600">Filter by tags</span>
            </div>
            <span className="text-xs text-gray-400">
              {selectedTags.length} selected
            </span>
          </Collapsible.Trigger>

          <Collapsible.Content className="overflow-hidden transition-all duration-200">
            <div className="p-2 border-t">
              <div className="flex flex-wrap gap-1.5">
                {sortedTags.map(({ tag, metadata, isSelected }) => (
                  <button
                    key={tag}
                    onClick={() => isSelected ? onTagDeselect(tag) : onTagSelect(tag)}
                    className={`
                      text-xs px-2 py-0.5 rounded-full
                      ${metadata.color}
                      ${isSelected ? 'ring-2 ring-offset-1 ring-blue-400' : 'opacity-75'}
                      hover:opacity-100
                      transition-all duration-150
                    `}
                  >
                    {metadata.label}
                  </button>
                ))}
              </div>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  );
};

export default CollapsibleTags;