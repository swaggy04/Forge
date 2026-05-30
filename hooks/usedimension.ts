import { useEffect, useState } from "react";

export default function useDimensions<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const currentRef = containerRef.current;

    if (!currentRef) return;

    function getDimensions() {
      return {
        width: currentRef!.offsetWidth,
        height: currentRef!.offsetHeight,
      };
    }

    setDimensions(getDimensions());

    const resizeObserver = new ResizeObserver(() => {
      setDimensions(getDimensions());
    });

    resizeObserver.observe(currentRef);

    return () => {
      resizeObserver.unobserve(currentRef);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return dimensions;
}