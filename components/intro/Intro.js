import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./Intro.module.scss";
import { intro } from "@/constants/copyright";
import Picture from "../baseComponents/gui/picture/Picture";
import TvLogo from "../tvLogo/TvLogo";
import CustomButton from "../customButton/CustomButton";
import { safeHTML } from "@/utils/ps/frontend";
import Icon from "../baseComponents/gui/icon/Icon";

export default function Intro({className}) {
  const containerRef = useRef(null);
  return (
    <section className={classNames(styles.intro, className)}>
      <div className={styles.intro__bg} ref={containerRef}>
        <div className={styles.intro__picture}>
          {...intro.bgItems.map((item, index)=>{
            return(
              <div key={index} className={classNames(styles[`intro__bgItem_${item.modifier}`], styles.intro__bgItem)}>
                <Picture {...item}/> 
              </div>
            )
          })}          
        </div>
        <div className={styles.intro__redBg}> 
          <Picture {...intro.rightBg}/>
        </div>
      </div>
      <div className={styles.intro__content}>
        <div className={styles.intro__text}>
          {intro.content.map((item, index)=>{
          const {tag, caption, className} = item;
          const searchClass = (className ?? "").split(" ").filter(className => className.includes("intro__caption")).map(className => styles[className]);
          const otherClasses = (className ?? "").split(" ").filter(className => !className.includes("intro__caption"));
          // const classes = useSplitClasses(className, styles, "intro__caption");
          const Tag = tag || "p";
            return(
            <Tag key={index} className={classNames(styles.intro__caption, ...searchClass, ...otherClasses)}>
              <Icon name={intro.triangle} className={styles.inro__triangle}/>
              <span>{safeHTML(caption)}</span>
            </Tag>)
          })}
        </div>
          <CustomButton {...intro.button} 
            className={classNames(intro?.button?.className, styles.intro__button, 'customButton_intro')}
          />
          <TvLogo {...intro.tv} className={styles.intro__tv}/>  
      </div>
    </section>
  );
}
