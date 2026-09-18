import {useEffect} from "react";
import useWindowSize from "./useWindowSize";
import {browserData} from "@/utils/ps/frontend/src/detector/detector";

const IS_IOS = browserData?.parsedResult?.os?.name?.toLowerCase()?.indexOf("ios") !== -1;

export const useIOSGestureHack = () => {
  const height = useWindowSize()[1];

  useEffect(() => {
    document.documentElement.style.setProperty("--vh", `${height * 0.01}px`);
  }, [height]);

  useEffect(() => {
    if (IS_IOS) document.body.classList.add("_isIos");
    document.addEventListener("gesturestart", e => e.preventDefault());
  }, []);
};
