import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchIcon } from "./icons";
import { VariantProps, cva } from "class-variance-authority";
import { FieldError } from "react-hook-form";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        plain:
          "bg-transparent h-full w-full text-lg border-none  focus-visible:ring-0 focus-visible:ring-offset-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: FieldError | undefined;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }), "", {
          "ring-offset-red-600": error,
        })}
        ref={ref}
        {...props}
      />
    );
  }
);
const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          `flex bg-darker   rounded-md items-center pr-2`,
          className
        )}
      >
        <Input
          className="bg-transparent h-full w-full text-lg border-none  focus-visible:ring-0 focus-visible:ring-offset-0"
          ref={ref}
          {...props}
        />
        <SearchIcon className="w-5" />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, SearchInput };
