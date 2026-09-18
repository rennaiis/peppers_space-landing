import {useEffect, useState} from "react";

export const useCashedBounding = ({elements, dependencies}) => {
  const [bounding, setBounding] = useState({});

  useEffect(() => {
    const onResize = () => {
      const boundingData = {};
      for (const key in elements) boundingData[key] = elements[key].getBoundingClientRect();
      setBounding(boundingData);
    };
    onResize();
    global?.addEventListener("resize", onResize);
    return () => global?.removeEventListener("resize", onResize);
  }, dependencies);

  return bounding;
};
