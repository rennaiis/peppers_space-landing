import {useEffect, useRef, useState} from "react";
import {getBoundingBox} from "../utils";
import isEqual from "react-fast-compare";

export default function useComputeArea({ref, activeTutorialData, isAvailableTutorial, trigger}) {
  const firstInterRef = useRef(false);
  const [area, setArea] = useState({x: 0, y: 0, width: 0, height: 0});
  const [finger, setFinger] = useState(null);

  useEffect(() => {
    if (!isAvailableTutorial || !activeTutorialData.area) return;

    const {
      area: {
        selectors,
        targetClickSelector,
        offset: {width: offsetWidth = 0, height: offsetHeight = 0, x = 0, y = 0} = {},
      },
      timeout = 0,
    } = activeTutorialData;

    setFinger(null);
    setArea({x: 0, y: 0, width: 0, height: 0});
    firstInterRef.current = false;

    if (!selectors?.length) return;

    let clearFunctions;
    let observeTimeout;

    const tutorialTimeout = setTimeout(() => {
      const domElements = selectors.reduce((acc, selector) => {
        const domElement = document.querySelector(selector);
        if (domElement) acc.push(domElement);
        return acc;
      }, []);
      if (!domElements.length) return console.log(`selectors not found`, selectors);
      const targetClickElement = document.querySelector(targetClickSelector);

      const observerCallback = () => {
        if (!firstInterRef.current) {
          firstInterRef.current = true;
          return;
        }
        const {top, left, right, bottom} = getBoundingBox(domElements);

        if (targetClickElement) {
          const rect = getBoundingBox([targetClickElement]);
          const width = rect.right - rect.left;
          const height = rect.bottom - rect.top;

          const finger = globalToLocal(
            {
              ...rect,
              x: rect.left + width / 2,
              y: rect.top + height / 2,
            },
            ref,
          );

          setFinger(prevFinger => (isEqual(prevFinger, finger) ? prevFinger : finger));
        }

        const area = globalToLocal(
          {
            x: left - offsetWidth / 2 + x,
            y: top - offsetHeight / 2 + y,
            width: right + offsetWidth - left,
            height: bottom + offsetHeight - top,
          },
          ref,
        );

        setArea(prevArea => (isEqual(prevArea, area) ? prevArea : area));
      };

      clearFunctions = domElements
        .concat(targetClickElement)
        .filter(Boolean)
        .map(domElement => {
          const resizeObserver = new ResizeObserver(observerCallback);
          resizeObserver.observe(domElement);
          return () => resizeObserver.disconnect();
        });

      observeTimeout = setTimeout(observerCallback, 300);
    }, timeout);

    return () => {
      clearTimeout(tutorialTimeout);
      clearTimeout(observeTimeout);
      clearFunctions?.forEach?.(func => func?.());
    };
  }, [activeTutorialData, isAvailableTutorial, trigger]);

  return {area, finger};
}

function globalToLocal(area, ref) {
  const container = ref?.current;
  const rect = container?.getBoundingClientRect();

  return {
    x: area.x - (rect?.left || 0),
    y: area.y - (rect?.top || 0),
    width: area.width,
    height: area.height,
  };
}
