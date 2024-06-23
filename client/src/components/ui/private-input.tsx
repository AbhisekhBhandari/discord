import { useState, forwardRef, MouseEvent } from "react";

import { cn } from "@/lib/utils";

import Image from "next/image";
import EyeClosed from "@/assets/icons/eye-closed.svg";
import EyeOpen from "@/assets/icons/eye-open.svg";
import { Button } from "./button";
import { Input } from "./input";
import { EyeCloseIcon, EyeOpenIcon } from "./icons";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
}

const PrivateInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isDisabled, setIsDisabled] = useState(props.disabled);

    function handlePasswordToggle(
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) {
      setShowPassword((prev) => !prev);
    }
    return (
      <div
        className={cn(
          `flex h-10 bg-input w-full rounded-md border border-input    ring-offset-background 
        file:border-0 file:bg-transparent file:text-sm file:font-medium
        placeholder:text-muted-foreground`,
          {
            "outline-none ring-2 ring-ring ring-offset-2": isFocused,
            "disabled:cursor-not-allowed disabled:opacity-50": isDisabled,
          },
          className,
          {
            "ring-offset-red-600": error,
          }
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Input
          type={showPassword ? "text" : type}
          className={"w-1/2 flex-grow text-sm   h-full outline-none  "}
          ref={ref}
          variant={"plain"}
          {...props}
        />

        <div
          onClick={handlePasswordToggle}
          className="flex text-muted-foreground text-opacity-10 tex  h-full w-7 items-center justify-center   cursor-pointer"
        >
          {showPassword ? (
            <EyeOpenIcon />
          ) : (
            // <Image
            //   src={EyeOpen}
            //   alt="eyesOpen"
            //   height={20}
            //   className={cn({ "opacity-50": !isFocused })}
            // />
            <EyeCloseIcon />
            //   <Image
            //     src={EyeClosed}
            //     alt="eyesClosed"
            //     height={20}
            //     className={cn({ "opacity-50": !isFocused })}
            //   />
          )}
        </div>
      </div>
    );
  }
);
PrivateInput.displayName = "Input";

export { PrivateInput };
