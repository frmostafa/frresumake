import { useState , useCallback } from "react";

const useComponentSize = () => {
    const [size, setSize] = useState(null);
  
    const onLayout = useCallback(event => {
      const { width, height } = event.nativeEvent.layout;
      setSize({ width, height });
    }, []);
  
    return [size, onLayout];
  };
  
  const Component = () => {
    const [size, onLayout] = useComponentSize();
    return <View onLayout={onLayout} />;
  };

  export default useComponentSize;