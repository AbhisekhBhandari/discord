import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

function CustomTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        he
        </TooltipTrigger>
        <TooltipContent
          side="right"
          arrowPadding={10}
          className="mx-1 border-none"
        >
          <div className="py-1 ">
            <p className="text-lg text-white ">{teamName}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CustomTooltip;
