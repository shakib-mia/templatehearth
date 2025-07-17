// hooks/useLenis.js
import Lenis from "lenis";
import { useEffect } from "react";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Clean up
      lenis.destroy();
    };
  }, []);
};

export default useLenis;
