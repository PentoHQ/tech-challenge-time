import { useEffect, useRef } from "react";

const useDidMount = (func: any, deps: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = didMount.current ? func() : true;
  }, deps);
};

export default useDidMount;
