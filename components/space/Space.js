import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Space.module.scss";
import { space } from "@/constants/copyright"; 
import TvLogo from "../tvLogo/TvLogo";
import CustomButton from "../customButton/CustomButton";
import Picture from "../baseComponents/gui/picture/Picture";

export default function Space({}) {
  return (
    <section className={styles.space}>
      <div className={styles.space__bg}>
        {...space.bgItems.map((item, index)=>{
            return (
              <div key={index} className={classNames(styles.space__bgItem, styles[`space__bgItem_${item.modifier}`])}>
                <Picture {...item}/>
              </div>
            )
          })}
      </div>
      <div className={styles.space__content}>
        <h2 className={styles.space__title}>{space.title}</h2>
        <TvLogo {...space.tv} className={styles.space__logo}/>
        <CustomButton {...space.button} 
        className={classNames(space?.button?.className, styles.space__button, 'customButton_space')}/>
         
      </div>
    </section>
  );
}

Space.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
