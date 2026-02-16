import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function PageTransitions({ children }) {
  const location = useLocation();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;

    gsap.set(el, { opacity: 0 });

    const tl = gsap.timeline();

    tl.to(el, {
      opacity: 1,
      duration: 1.2,
      ease: "circ.out",
    });
  }, [location]);

  return (
    <div key={location.pathname} ref={containerRef}>
      {children}
    </div>
  );
}
