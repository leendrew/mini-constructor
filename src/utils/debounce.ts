export function debounce<T extends (...args: any[]) => ReturnType<T>>(fn: T, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function debounced(...args: Parameters<T>) {
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, ms);
  }

  debounced.cancel = () => {
    if (typeof timeoutId !== 'number') {
      return;
    }
    clearTimeout(timeoutId);
  };

  return debounced;
}
