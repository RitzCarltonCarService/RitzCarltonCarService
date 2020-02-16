import { useState } from 'react';

// Custom React hook to hold a function in state
export default function useFunctionAsState(fn) {

  const [val, setVal] = useState(() => fn);

  function setFunc(fn) {
    setVal(() => fn);
  }

  return [val, setFunc];
  
}