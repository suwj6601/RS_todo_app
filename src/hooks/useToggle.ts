import { useReducer } from 'react';

import isBoolean from 'lodash/isBoolean';

function toggler(currentValue, newValue) {
  return isBoolean(newValue) ? newValue : !currentValue;
}
function useToggle(initialValue = false): [boolean, (value?: boolean) => void] {
  return useReducer(toggler, initialValue);
}

export default useToggle;
