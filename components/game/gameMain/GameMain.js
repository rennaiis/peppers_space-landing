import React, {useContext} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameMain.module.scss";
import GButton from "../gButton/GButton";
import GameMenu from "../gameMenu/GameMenu";
import {PlatformContext} from "../../../pages/platform";
import {useRouter} from "next/router";
import Link from "next/link";
import PS from "@PS";
const {image} = PS.frontend;

export default function GameMain({className, menu, topButtons, about, counters}) {
  const {actions} = useContext(PlatformContext);
  const router = useRouter();

  return (
    <div className={classNames(styles.gameMain, className)}>
      <img src={image("game/main/main_menu.png")} className={classNames(styles.gameMain__bg)} alt={""} />
      <div className={classNames(styles.gameMain__buttons)}>
        {topButtons?.map((item, index) => (
          <GButton
            key={`GButton-button-${index}`}
            {...item}
            tag={Link}
            href={item.href}
            delay={index}
            className={classNames(styles.gameMain__button, item.className)}
            // onClick={() => router.push(`/platform/${item.action.slice(2).toLowerCase()}`)}
          />
        ))}
      </div>
      <GameMenu className={classNames(styles.gameMain__menu)} />
    </div>
  );
}
GameMain.propTypes = {
  className: PropTypes.string,
};
