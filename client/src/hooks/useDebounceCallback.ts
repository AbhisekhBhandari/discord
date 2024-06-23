import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce"; // Ensure the correct import path

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const [args, setArgs] = useState<Parameters<T> | null>(null);
  const debouncedArgs = useDebounce(args, delay);

  useEffect(() => {
    if (debouncedArgs !== null) {
      callback(...debouncedArgs);
    }
  }, [debouncedArgs, callback]);
  console.log('args',args);
  
  return (...newArgs: Parameters<T>) => {
    
    setArgs(newArgs);
  };
}
