import { useState , useEffect } from "react";

const useDimensions = elementRef => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
     const el = elementRef.current;
     setDimensions({ width: el.clientWidth, height: el.clientHeight });
   }, [elementRef]);
   return [dimensions];
};

export default useDimensions;