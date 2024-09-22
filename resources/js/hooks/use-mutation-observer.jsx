import { useEffect } from "react";

export function useMutationObserver(ref, callback, options) {
  useEffect(() => {
    const targetNode = ref.current;
    if (!targetNode) return;

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, options);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, options]);
}
