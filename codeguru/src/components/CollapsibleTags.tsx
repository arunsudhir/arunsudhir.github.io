import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

// This component will handle the collapsible tags section
const CollapsibleTags = ({ 
  tags,
  onDragStart,
  isDragging
}: {
  tags: string[];
  onDragStart: (token: string) => void;
  isDragging: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Group tags by their first letter
  const groupedTags = tags.reduce((acc, tag) => {
    const firstLetter = tag[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(tag);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="w-full space-y-2">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between">
          <CollapsibleTrigger className="flex items-center space-x-2 hover:text-blue-600">
            {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <span className="font-medium">Available Tags</span>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-4">
          {Object.entries(groupedTags).map(([letter, letterTags]) => (
            <div key={letter} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">{letter}</h3>
              <div className="flex flex-wrap gap-2">
                {letterTags.map((tag) => (
                  <div
                    key={tag}
                    draggable
                    onDragStart={() => onDragStart(tag)}
                    className={`
                      text-sm px-3 py-1 rounded-full 
                      bg-blue-100 text-blue-800 
                      cursor-grab active:cursor-grabbing
                      hover:bg-blue-200 transition-colors
                      ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                    `}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CollapsibleTags;