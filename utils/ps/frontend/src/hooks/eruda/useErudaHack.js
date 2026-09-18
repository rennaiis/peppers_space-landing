import {useEffect, useRef} from "react";

export const useErudaHack = () => {
  const erudaRef = useRef();

  useEffect(() => {
    if (!window.__erudaToDisplayListenElement) console.log("trying to attach eruda, but no import maybe");

    return !erudaRef.current ? console.error(`No eruda ref`) : window.__erudaToDisplayListenElement?.(erudaRef.current);
  }, []);

  return erudaRef;
};

/**
 * Для просмотра консоли на мобильных устройствах
 * Пример: http://localhost:3000/?eruda=true
 */
export function useErudaParam() {
  useEffect(() => {
    if (!/eruda=true/.test(window.location)) return;
    const script = document.createElement("script");
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    script.async = true;
    script.onload = () => global.eruda.init();
    document.body.appendChild(script);
  }, []);
}
