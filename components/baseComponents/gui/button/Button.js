import React, {useState, useEffect, useRef} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {combineRefs} from "@PS/frontend";

const defaults = {
  up: "button_up",
  down: "button_down",
  hover: "button_hover",
  tag: "button",
};

const Button = React.forwardRef(function Button(
  {className, tag, compclass, color, border, type, onClick, children, up, down, hover, ...rest},
  ref,
) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHover] = useState(false);
  const settings = {up: up ?? defaults.up, down: down ?? defaults.down, hover: hover ?? defaults.hover};
  const Tag = tag || defaults.tag;

  const targetRef = useRef();

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    function pressedOn() {
      setPressed(true);
    }

    function pressedOff() {
      setPressed(false);
    }

    function hoverOn() {
      setHover(true);
    }

    function hoverOff() {
      setHover(false);
    }

    const events = [
      ["mousedown", pressedOn],
      ["mouseup", pressedOff],
      ["mousemove", hoverOn],
      ["mouseleave", hoverOff],
      ["touchstart", pressedOn],
      ["touchend", pressedOff],
      ["touchcancel", pressedOff],
    ];

    events.forEach(([type, handler]) => el.addEventListener(type, handler));
    return () => events.forEach(([type, handler]) => el.removeEventListener(type, handler));
  }, []);

  return (
    <Tag
      {...rest}
      className={classNames("button", className, compclass, {
        [`button_${color}`]: !!color,
        [`button_${border}`]: !!border,
        [`button_${type}`]: !!type,
        [settings.down]: pressed,
        [settings.hover]: hovered && !pressed,
        [settings.up]: !hovered && !pressed,
      })}
      ref={combineRefs([targetRef, ref])}
      onClick={onClick}
      type={type}
    >
      {children}
    </Tag>
  );
});

export default Button;

Button.defaultProps = defaults;

Button.propTypes = {
  /**
   * Внетренние элементы копмонента
   */
  children: PropTypes.node,
  /**
   * Классы для компонента
   */
  className: PropTypes.string,
  /**
   * Все пропы пробрасываются. Так что можно сделать кнопку с тегом a и пробросить проп href, для получения ссылки
   */
  tag: PropTypes.string,
  /**
   * Класс по умолчанию
   */
  up: PropTypes.string,
  /**
   * Класс когда кнопка нажата
   */
  down: PropTypes.string,
  /**
   * Класс на ховер
   */
  hover: PropTypes.string,
  /**
   * Модификатор для цвета
   */
  color: PropTypes.string,
  /**
   * Модификатор для рамки
   */
  border: PropTypes.string,
  /**
   * Модификатор для определенного типа
   */
  type: PropTypes.string,
  /**
   * Дополнительный класс
   */
  compclass: PropTypes.string,
};
