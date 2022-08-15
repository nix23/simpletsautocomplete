import React, { useState, useEffect } from "react";

// Helper hook to debounce fast changing value like input value of autocomplete.
// Hook should be used together with useEffect to ensure that expensive operations
// like API calls are not executed too often.
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
  return debouncedValue;
}

export default useDebounce;