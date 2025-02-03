import { useEffect, useState } from "react";
import { getItem, setItem, removeItem } from "../utils/localStorage";

export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const item = getItem(key);
    return (item as T) || initialValue;
  });

  useEffect(() => {
    value === null ? removeItem(key) : setItem(key, value);
  }, [value]);

  return [value, setValue] as const;
}
