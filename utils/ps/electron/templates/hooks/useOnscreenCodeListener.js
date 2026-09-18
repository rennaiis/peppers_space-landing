import {useEffect} from "react";
import {addOnscreenCodeListener} from "../utils/addOnscreenCodeListener";

export default function useOnscreenCodeListener(code, fn) {
  useEffect(() => {
    return addOnscreenCodeListener(code, fn);
  }, [code, fn]);
}
