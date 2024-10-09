import { useState, useEffect } from 'react';

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // 상태가 빈 문자열일 경우에도 항상 새로운 값으로 취급되도록 강제 재설정
  useEffect(() => {
    if (value === '') {
      setDebouncedValue('');
    }
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
