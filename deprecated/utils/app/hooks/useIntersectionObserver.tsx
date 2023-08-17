import { useCallback, useEffect, useRef, useState } from "react";

const useIntersectionObserver = () => {
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return { loader, loading, setLoading };
};

export default useIntersectionObserver;
