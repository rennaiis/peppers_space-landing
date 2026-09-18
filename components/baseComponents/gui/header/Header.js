import React, {useContext} from "react";
import * as PropTypes from "prop-types";
import HeaderLogo from "./HeaderLogo";
import HeaderBurger from "./HeaderBurger";
import HeaderMenu from "./HeaderMenu";
import styles from "../customHeader/CustomHeader.module.scss";
import classNames from "classnames";
import {BurgerContext} from "@/providers/BurgerProvider";

export default function Header({burgerShow = true, logo, menu, children} = {}) {
  const {burger} = useContext(BurgerContext);
  return (
    <header
      className={classNames("header", styles.customHeader, {
        [styles.customHeader_on]: burger,
      })}
    >
      <div className={classNames("header__block", styles.customHeader__block)}>
        {logo ? <HeaderLogo logo={logo} /> : null}
        {menu ? <HeaderMenu menu={menu} /> : null}
        {burgerShow ? <HeaderBurger /> : null}
        {children}
      </div>
    </header>
  );
}

Header.propTypes = {
  /*
    В зависмости от параметра бургер для меню либо добавляется либо нет
  */
  burger: PropTypes.bool,
  /*
    Компонент, который будет добавлятся в logo
  */
  logo: PropTypes.element,
  /*
    Компонент, который будет добавлятся в качестве меню
  */
  menu: PropTypes.element,

  children: PropTypes.element,
};
