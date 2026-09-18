import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./Steps.module.scss";
import { steps } from "@/constants/copyright";
import Step from "../step/Step";
import CustomButton from "../customButton/CustomButton";
import Picture from "../baseComponents/gui/picture/Picture";
import { safeHTML } from "@/utils/ps/frontend";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"; 

export default function Steps() {
  const containerRef = useRef(null)
  return (
    <section className={styles.steps} id='steps'>
      <div className={styles.steps__bg} ref={containerRef}>
        <div className={classNames(styles.steps__bgItem, styles[`steps__bgItem_${steps.back.modifier}`])}>
          <Picture {...steps.back}/>
        </div>
      <MouseParallaxContainer
        globalFactorX={0.1}
        globalFactorY={0.1}
        containerStyle={{width: '100vw', height: '100vh', overflow: 'visible'}}
      >
        {steps.bgItems.map((item, index)=>{
          return (
            <MouseParallaxChild factorX={0.1 + 0.5 * index} factorY={0.1 + 0.5 * index} data-depth={item.dataDepth} key={index} className={classNames(styles.steps__bgItem, styles[`steps__bgItem_${item.modifier}`])}>
              <Picture {...item}/>
            </MouseParallaxChild>
          )
        })}
      </MouseParallaxContainer>
      </div>
      <div className={styles.steps__content}>
        <h2 className={styles.steps__title}>{safeHTML(steps.title)}</h2>
        <ul className={styles.steps__track}>
           {steps.steps.map((item, index) => (
              <Step {...item} key={`item-${index}`}/>
            ))}
        </ul>
        <CustomButton {...steps.button}
        className={classNames(steps?.button?.className, styles.steps__button, 'customButton_steps')}
        />
        
        
      </div>
    </section>
  );
}
