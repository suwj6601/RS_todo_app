import { useMemo } from 'react';
import useToggle from 'src/hooks/useToggle';

export type BooleanHandlers = {
  toggle: (value?: boolean) => void;
  on: () => void;
  off: () => void;
};

function useBoolean(initialValue = false): [boolean, BooleanHandlers] {
  const [value, toggle] = useToggle(initialValue);

  const handlers = useMemo<BooleanHandlers>(
    () => ({
      toggle,
      on: () => toggle(true),
      off: () => toggle(false),
    }),
    [toggle],
  );

  return [value, handlers];
}

export default useBoolean;
