import React, {useContext} from "react";
import styles from "../customHeader/CustomHeader.module.scss";
import classNames from "classnames";
import {BurgerContext} from "@/providers/BurgerProvider";

export default function HeaderBurger() {
  const {burger, setBurger} = useContext(BurgerContext);
  return (
    <label
      htmlFor={"menu-burger"}
      className={classNames("header__burger ", styles.customHeader__burger)}
      onClick={() => setBurger(!burger)}
    >
      <p />
      <p />
      <p />
    </label>
  );
}
