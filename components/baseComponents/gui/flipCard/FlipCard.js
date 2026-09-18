import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import FlipCardSide from "./FlipCardSide";
import {FlipCardPropType} from "@/components/baseComponents/gui/flipCard/FlipCardPropType";
import style from "./FlipCard.module.scss";

export default function FlipCard({
  className,
  frontSide,
  backSide,
  isFlipped,
  onClick,
  effect,
  SideComponent = FlipCardSide,
}) {
  return (
    <div
      onClick={onClick}
      className={classNames(style.flipCard, className, {
        [style.flipCard_rotate]: isFlipped,
        [style.flipCard_corner]: effect === "corner",
      })}
    >
      <div className={style.flipCard__content}>
        <SideComponent
          className={classNames(style.flipCard__side, style.flipCard__side_front)}
          {...frontSide}
          side={"front"}
        />
        <SideComponent
          className={classNames(style.flipCard__side, style.flipCard__side_back)}
          {...backSide}
          side={"back"}
        />
      </div>
    </div>
  );
}

FlipCard.propTypes = {
  className: PropTypes.string,
  frontSide: PropTypes.shape(FlipCardPropType.card),
  backSide: PropTypes.shape(FlipCardPropType.card),
  children: PropTypes.node,
  isFlipped: PropTypes.bool,
  onClick: PropTypes.func,
  effect: PropTypes.oneOf(["corner"]),
  SideComponent: PropTypes.elementType,
};
