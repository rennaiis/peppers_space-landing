import {useEffect} from "react";

export default function useLicense(license) {
  useEffect(() => {
    if (!(global.document && license)) return;

    const {body} = global.document;
    Object.keys(license).forEach(key => body.setAttribute(`data-${key}`, license[key]));
    import("../utils/license/license");
  }, [license]);
}
