// Taken from https://stackoverflow.com/a/36862446
import { useState, useEffect } from 'react';

function getWindowDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
