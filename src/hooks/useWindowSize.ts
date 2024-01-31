import { useEffect } from 'react';
import { useImmer } from 'use-immer';

interface Size {
  width: number;
  height: number;
}

export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useImmer<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize((draft) => {
        draft.width = window.innerWidth;
        draft.height = window.innerHeight;
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
