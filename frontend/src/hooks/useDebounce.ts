import { useState, useEffect } from 'react';

/**
 * Custom hook debounce value.
 * Tránh gọi API liên tục khi user đang gõ.
 * 
 * @param value - Giá trị cần debounce
 * @param delay - Thời gian delay (ms), mặc định 400ms
 * @returns Giá trị đã được debounce
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timeout để cập nhật giá trị sau delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clear timeout nếu value thay đổi trước khi delay kết thúc
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
