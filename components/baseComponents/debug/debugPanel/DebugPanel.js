import styles from "./DebugPanel.module.scss";
import {useState} from "react";

const defaultConfig = [
  {
    isSwitching: false,
    text: ">> Win",
    action: "setWin",
  },
  {
    isSwitching: false,
    text: ">> Lose",
    action: "setLose",
  },
];

export function DebugPanel({config = defaultConfig}) {
  const [switches, setSwitches] = useState({});

  if (process.env.NODE_ENV !== "development") return null;

  const handleClick = item => {
    const fn = global.window?.[item.action];
    fn?.();
  };

  const toggleSwitch = (item, index) => {
    const nextValue = !switches[index];

    setSwitches(prev => ({
      ...prev,
      [index]: nextValue,
    }));

    const fn = global.window?.[item.action];
    fn?.(nextValue);
  };

  return (
    <div className={styles.container}>
      {config.map((item, index) => {
        if (item.isSwitching) {
          const checked = !!switches[index];

          return (
            <div className={styles.container__switcher__row} key={index}>
              <span className={styles.container__switcher__label}>{item.text}</span>

              <label className={styles.container__switcher}>
                <input type="checkbox" checked={checked} onChange={() => toggleSwitch(item, index)} />
                <span className={styles.container__slider} />
              </label>
            </div>
          );
        }

        return (
          <button key={index} onClick={() => handleClick(item)} className={styles.container__debugButton}>
            {item.text}
          </button>
        );
      })}
    </div>
  );
}
