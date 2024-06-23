import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "../useDebounce";

export const useResp = () => {
  // screen resolutions
  const [screenState, setScreenState] = useState({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    _2xl: false,
  });

  console.log("screen stat", screenState);

  // update the state on window resize
  const onResizeHandler = useCallback(() => {
    const sm = window.innerWidth >= 640;
    const md = window.innerWidth >= 768;
    const lg = window.innerWidth >= 1024;
    const xl = window.innerWidth >= 1280;
    const _2xl = window.innerWidth >= 1536;
    setScreenState({ sm, md, lg, xl, _2xl });
  }, []);

  // debounce the resize call
  const debouncedCall = useDebounce(onResizeHandler, 500);

  useEffect(() => {
    // update the state on the initial load
    onResizeHandler();

    // add event listener
    window.addEventListener("resize", debouncedCall);

    return () => {
      // remove the event listener
      window.removeEventListener("resize", debouncedCall);
    };
  }, []);

  return screenState;
};
