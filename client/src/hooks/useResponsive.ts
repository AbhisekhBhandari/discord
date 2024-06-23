"use client";
import { useEffect, useState } from "react";

export function useResponsive() {
  const [screenState, setScreenState] = useState({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    _2xl: false,
  });
  useEffect(() => {
    window.addEventListener("resize", onResizeHandler);
    onResizeHandler();
    return () => window.removeEventListener("resize", onResizeHandler);
  }, []);

  function onResizeHandler() {
    const sm = window.innerWidth >= 640;
    const md = window.innerWidth >= 768;
    const lg = window.innerWidth >= 1024;
    const xl = window.innerWidth >= 1280;
    const _2xl = window.innerWidth >= 1536;
    setScreenState({ sm, md, lg, xl, _2xl });
  }
  //   window.addEventListener("resize", d, false);
  return { screenState };
}

export const useDimensions = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
};
