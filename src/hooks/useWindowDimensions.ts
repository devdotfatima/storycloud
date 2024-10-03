"use client";
import { useState, useEffect, useCallback } from "react";

const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : 0; // Use 0 instead of null
    const height = hasWindow ? window.innerHeight : 0; // Use 0 instead of null
    return { width, height };
  }, [hasWindow]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (!hasWindow) return;

    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasWindow, getWindowDimensions]);

  return windowDimensions;
};

export default useWindowDimensions;
