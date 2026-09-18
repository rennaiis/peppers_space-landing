import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {safeHTML} from "../../../../utils/safeHTML";
import {FlipCardPropType} from "@/components/baseComponents/gui/flipCard/FlipCardPropType";
import style from "./FlipCardSide.module.scss";

export default function FlipCardSide(props) {
  const {className, children, image, title, text, side} = props;
  return (
    <div
      className={classNames(style.flipCardSide, className, {
        [style.flipCardSide_front]: side === "front",
        [style.flipCardSide_back]: side === "back",
      })}
      style={{backgroundImage: image && `url("${image}")`}}
    >
      {title && <strong className={style.flipCardSide__title}>{safeHTML(title)}</strong>}
      {text && <strong className={style.flipCardSide__text}>{safeHTML(text)}</strong>}
      {children}
    </div>
  );
}
FlipCardSide.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  side: PropTypes.oneOf(["front", "back"]),
  ...FlipCardPropType.card,
};
