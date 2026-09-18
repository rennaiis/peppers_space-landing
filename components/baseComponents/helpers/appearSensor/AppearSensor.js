import {useInView} from "react-intersection-observer";
import {useState} from "react";

export default function AppearSensor({onChange, children, ...rest}) {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // Хук для отслеживания видимости элемента
  const {ref, inView} = useInView({
    triggerOnce: false, // Срабатывает только один раз
    threshold: 0,
    ...rest, // Прокидываем остальные пропсы
  });

  // Когда элемент виден, обновляем состояние hasBeenVisible
  if (inView && !hasBeenVisible) {
    setHasBeenVisible(true);
  }

  // Вызов onChange, если он передан
  if (typeof onChange === "function") {
    onChange(inView);
  }

  return <div ref={ref}>{children({isVisible: inView, hasBeenVisible})}</div>;
}
