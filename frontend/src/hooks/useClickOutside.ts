import { useEffect, useRef, type RefObject } from 'react';

/**
 * Custom hook phát hiện click outside element.
 * Dùng để đóng dropdown khi click ra ngoài.
 * 
 * @param handler - Callback khi click outside
 * @returns Ref để gắn vào element cần theo dõi
 */
export function useClickOutside<T extends HTMLElement>(
  handler: () => void
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
}
