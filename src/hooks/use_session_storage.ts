import { useState, useEffect } from 'react';

export function useSessionStorage(cookieName: string) {
  const [value, setValue] = useState('');

  const updateSessionStorage = (value: string) => {
    sessionStorage.setItem(cookieName, value);
    setValue(value);
  };

  useEffect(() => {
    const storedValue = sessionStorage.getItem(cookieName);
    if (storedValue) {
      setValue(storedValue);
    }
  }, [cookieName]);

  return { value, updateSessionStorage };
}
