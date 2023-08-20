import { useEffect, useRef } from 'react';

export function useOutsideClick(handler: () => void, listenCapturing = true) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e?.target)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, listenCapturing);

    return () =>
      document.removeEventListener(
        'click',
        handleClickOutside,
        listenCapturing
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listenCapturing]);

  return ref;
}
