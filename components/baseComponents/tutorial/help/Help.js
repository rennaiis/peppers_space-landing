import React, {forwardRef, useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import CustomButton from "../../../../components/customButton/CustomButton";
import styles from "./Help.module.scss";
import {safeHTML, image} from "@PS/frontend";
import {eventSubscription} from "@PS/core";

const Help = forwardRef(
  (
    {
      className,
      title,
      isBubble,
      text,
      button,
      id,
      timeout,
      stopOnClick,
      onClick,
      needTapToContinue,
      area,
      children,
      mods = [],
    },
    ref,
  ) => {
    useEffect(
      () =>
        eventSubscription({
          callbacksBus: [{event: "click", callback: () => needTapToContinue && onClick?.()}],
        }),
      [needTapToContinue],
    );

    const modsClasses = mods.reduce((obj, mod) => ({...obj, [styles[`help_${mod}`]]: true}), {});

    return (
      <div
        ref={ref}
        className={classNames(styles.help, className, {
          [styles[`help_id_${id}`]]: id,
          ...modsClasses,
          [styles.help_activeFull]: needTapToContinue,
          [styles.help_activeButtonOnly]: !!button,
          [styles.help_activeAreas]: !needTapToContinue && !button,
        })}
      >
        <div className={styles.help__container}>
          <div className={styles.help__block}>
            <div className={styles.help__content}>
              {(title || text) && (
                <div className={styles.help__info}>
                  {title && <h4 className={styles.help__title}>{safeHTML(title)}</h4>}
                  {text && <p className={styles.help__text}>{safeHTML(text)}</p>}
                  {button && (
                    <CustomButton
                      className={classNames(styles.help__button, "custom-button_help-info custom-button_gray")}
                      bgImg={image("buttons/helpBg.svg")}
                      {...button}
                      onClick={() => !needTapToContinue && !stopOnClick && onClick?.()}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  },
);

export default Help;

Help.propTypes = {
  className: PropTypes.string,
};
