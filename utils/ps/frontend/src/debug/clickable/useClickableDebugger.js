import {useEffect, useRef} from "react";
/**
 * debug-tool, если на елементе выключены клики, то он должен покраситься краснымы фоном
 * **/
export function useClickableDebugger(enabled = true) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current || document.body;

    const observer = new MutationObserver(() => {
      highlightNonClickable(root);
    });

    observer.observe(root, {
      subtree: true,
      attributes: true,
      childList: true,
      attributeFilter: ["style", "class", "disabled", "aria-disabled"],
    });

    let rafId;

    const loop = () => {
      highlightNonClickable(root);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  return rootRef;
}

function highlightNonClickable(root) {
  const elements = root.querySelectorAll("*");

  elements.forEach(el => {
    const style = window.getComputedStyle(el);

    const isDisabled = el.disabled === true || el.getAttribute("aria-disabled") === "true";

    const hasNoPointerEvents = style.pointerEvents === "none";

    const isInvisible = style.display === "none" || style.visibility === "hidden" || style.opacity === "0";

    const isDead = hasNoPointerEvents || isDisabled || isInvisible;

    if (isDead) {
      el.style.background = "rgba(255, 0, 0, 0.25)";
      el.style.outline = "1px solid red";
    } else {
      el.style.background = "";
      el.style.outline = "";
    }
  });
}
