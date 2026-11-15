import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the top on page change, or to #section when the link has one. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a moment for the new page to render, then jump to the section.
      const t = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
