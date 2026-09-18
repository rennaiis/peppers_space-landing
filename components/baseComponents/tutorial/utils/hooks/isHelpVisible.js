import {useEffect, useState} from "react";

export default function useHelpVisible({timeout}) {
  const [visible, setVisible] = useState(!timeout || timeout <= 0);

  useEffect(() => {
    if (!timeout || timeout <= 0) {
      setVisible(true);
      return;
    }

    setVisible(false);

    const timer = setTimeout(() => {
      setVisible(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  return visible;
}
