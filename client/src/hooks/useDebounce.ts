import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValues] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValues(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
