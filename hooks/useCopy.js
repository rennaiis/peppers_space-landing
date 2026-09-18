import {useEffect, useState} from "react";
import {baseConsumers} from "@PS/core";

const COPY_DELAY = 1500;

export const useCopy = (defaultValue, copyValue) => {
  const [text, setText] = useState(defaultValue);

  useEffect(() => {
    if (text === defaultValue) return;

    const timeoutId = setTimeout(() => {
      baseConsumers.modalClose({type: "copiedModal"});
      setText(defaultValue);
    }, COPY_DELAY);

    baseConsumers.modalOpen({type: "copiedModal"});

    (async () => {
      if ("clipboard" in navigator && text) {
        try {
          const result = await navigator.permissions.query({name: "clipboard-write"});
          if (result.state === "granted" || result.state === "prompt")
            await navigator.clipboard.writeText(defaultValue);
        } catch (error) {
          navigator.clipboard.writeText(defaultValue);
        }
      }
    })();

    return () => clearTimeout(timeoutId);
  }, [text, copyValue]);

  return [text, setText, text !== defaultValue];
};
