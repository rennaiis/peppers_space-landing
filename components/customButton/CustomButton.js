import React, {forwardRef, useEffect, useRef, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../baseComponents/gui/button/Button";
import Icon from "../baseComponents/gui/icon/Icon";
import styles from "./CustomButton.module.scss";
import {safeHTML} from "@PS/frontend";
import {useButtonControl} from "@/components/customButton/utils/hooks/useButtonControl";
import { useInView } from "framer-motion";

const CustomButton = forwardRef(function (
  {
    className,
    children,
    text,
    img,
    icon,
    type = "button",
    onClick: click,
    disabled,
    tag,
    href,
    target,
    timeout,
    eventsData,
    events,
    preventDefault,
    stopPropagation,
    ...rest
  },
  ref,
) {
  const firstRef = useRef(null)
  const buttonRef = ref || firstRef
  const isInView = useInView(buttonRef)
  const {onClick, isDisabled} = useButtonControl({
    onClick: click,
    timeout,
    preventDefault,
    stopPropagation,
    events,
    eventsData,
  });

  const customButtonClasses = (className ?? "")
    .split(" ")
    .filter(className => className.includes("customButton"))
    .map(className => styles[className]);

  const otherClasses = (className ?? "").split(" ").filter(className => !className.includes("customButton"));

  return (
    <Button
      ref={buttonRef}
      type={type}
      className={classNames(styles.customButton, ...otherClasses, ...customButtonClasses)}
      onClick={onClick}
      disabled={isDisabled || disabled}
      tag={tag}
      href={href}
      target={target}
      {...rest}
    > 
      {children ?? (
        <div className={styles.customButton__block}>
          {(img || icon) && (
            <div className={styles.customButton__image}>
              {img && <img src={img} />}
              {icon && <Icon name={icon} />}
            </div>
          )}
          {/* <div className={classNames(styles.customButton__light, 
            {[styles.customButton__light_animated]: isInView})}>

          </div> */}
          {text && <div className={styles.customButton__text}>{safeHTML(text)}</div>}
        
        </div>
      )}
    </Button>
  );
});

CustomButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default CustomButton;
