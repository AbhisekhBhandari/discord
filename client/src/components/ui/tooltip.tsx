"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50  overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    {children}
    <TooltipPrimitive.Arrow width={12} height={5} className="text-popover" />
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface CTooltipProps extends React.HTMLAttributes<HTMLButtonElement> {
  element: JSX.Element;
  message: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  hoverBG?: boolean;
}

// function CTooltip({
//   element,
//   message,
//   side = "bottom",
//   sideOffset = 10,
//   hoverBG = false,
//   onClick,
//   className,
// }: CTooltipProps) {
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger onClick={onClick}>
//           {hoverBG ? (
//             <div className="h-10 w-10 flex items-center justify-center hover:bg-foreground/10  rounded-lg cursor-pointer">
//               {element}
//             </div>
//           ) : (
//             element
//           )}
//         </TooltipTrigger>
//         <TooltipContent
//           className={cn(`text-white border-none`, className)}
//           side={side}
//           sideOffset={sideOffset}
//         >
//           <p>{message}</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }

const CTooltip = React.forwardRef<HTMLDivElement, CTooltipProps>(
  (
    {
      element,
      message,
      side = "bottom",
      sideOffset = 10,
      hoverBG = false,
      onClick,
      className,
    },
    ref
  ) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={onClick} ref={ref}>
            {hoverBG ? (
              <div className="h-10 w-10 flex items-center justify-center hover:bg-foreground/10 rounded-lg cursor-pointer">
                {element}
              </div>
            ) : (
              element
            )}
          </TooltipTrigger>
          <TooltipContent
            className={cn(`text-white border-none`, className)}
            side={side}
            sideOffset={sideOffset}
          >
            <p>{message}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
  CTooltip,
};
