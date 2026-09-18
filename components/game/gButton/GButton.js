import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../../baseComponents/gui/button/Button";
import Icon from "../../baseComponents/gui/icon/Icon";
import styles from "./GButton.module.scss";
import PS from "@PS";
import {useButtonControl} from "@/components/customButton/utils/hooks/useButtonControl";
import {animations, buttonBase} from "@/components/baseComponents/helpers/transition/animations";
import PE from "@/components/baseComponents/gui/pElement/PElement";

const {safeHTML} = PS.frontend;

export default function GButton({
  className,
  children,
  text,
  img,
  icon,
  onClick: click,
  disabled,
  tag,
  href,
  target,
  timeout,
  noBorder,
  borderImg,
  imgBg,
  glare,
  glareMask,
  events,
  eventsData,
  preventDefault,
  stopPropagation,
  style,
  animationBorder,
  animationImageBg,
  animationImageImg,
  animationText,
  ...rest
}) {
  const {onClick, isDisabled} = useButtonControl({
    onClick: click,
    timeout,
    preventDefault,
    stopPropagation,
    events,
    eventsData,
  });

  const gButtonClasses = (className ?? "")
    .split(" ")
    .filter(className => className.includes("gButton"))
    .map(className => styles[className]);

  const otherClasses = (className ?? "").split(" ").filter(className => !className.includes("gButton"));

  return (
    <Button
      className={classNames(styles.gButton, ...otherClasses, ...gButtonClasses)}
      onClick={onClick}
      disabled={isDisabled || disabled}
      tag={tag}
      href={href}
      target={target}
      {...rest}
    >
      <PE.div
        animation={"buttonBase"}
        initial={animations.buttonBase.initial}
        exit={animations.buttonBase.exit}
        animate={{
          ...animations.buttonBase.animate,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {!noBorder && (
          <PE.div className={classNames(styles.gButton__border)} animation={animationBorder || "buttonBaseBorder"}>
            {glare && (
              <div
                className={classNames(styles.gButton__borderGlare)}
                style={{
                  WebkitMaskImage: glareMask ? `url(${glareMask})` : null,
                }}
              >
                <img src={glare} className={classNames(styles.gButton__borderGlareImg)} />
              </div>
            )}
            {borderImg ? (
              <img src={borderImg} className={classNames(styles.gButton__borderInner)} />
            ) : (
              <div className={classNames(styles.gButton__borderInner)} />
            )}
          </PE.div>
        )}
        {children ?? (
          <div className={styles.gButton__block}>
            {(img || icon) && (
              <div className={styles.gButton__image}>
                <div className={styles.gButton__imageBlock}>
                  {imgBg && (
                    <PE.img
                      src={imgBg}
                      className={styles.gButton__imageBg}
                      animation={animationImageBg || "buttonBaseImageBg"}
                    />
                  )}
                  {img && (
                    <PE.img
                      src={img}
                      className={styles.gButton__imageImg}
                      animation={animationImageImg || "buttonBaseImageImg"}
                    />
                  )}
                  {icon && <Icon name={icon} />}
                </div>
              </div>
            )}
            {text && (
              <PE.div className={styles.gButton__text} animation={animationText || "buttonBaseText"}>
                {safeHTML(text)}
              </PE.div>
            )}
          </div>
        )}
      </PE.div>
    </Button>
  );
}
GButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
