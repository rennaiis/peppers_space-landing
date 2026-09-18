import {useEffect, useState} from "react";
import {getRandomFromList} from "@/utils/ps/math";

export const useLoadNote = ({signs}) => {
  const [sign, setSign] = useState("");
  const useSign = signs?.length;

  useEffect(() => {
    if (!useSign) return;
    const cache = [];

    const update = () => {
      let available = signs.filter(sign => !cache.includes(sign));
      if (!available.length) {
        cache.length = 0;
        available = [...signs];
      }

      const sign = getRandomFromList(available);
      setSign(sign);
      cache.push(sign);
    };

    update();
    const interval = setInterval(update, 2380);
    return () => clearInterval(interval);
  }, [useSign]);

  return {sign};
};
