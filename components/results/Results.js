import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./Results.module.scss";
import { intro, results } from "@/constants/copyright";
import Result from "../result/Result";
import CustomButton from "../customButton/CustomButton";
import Picture from "../baseComponents/gui/picture/Picture";
import { safeHTML } from "@/utils/ps/frontend";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"; 
import { Element } from "react-scroll";

export default function Results() {
  
  const containerRef = useRef(null)
  return (
    <section id='about' className={styles.results} >
      <div className={styles.results__bg} ref={containerRef}>
        <div className={classNames(styles.results__bgItem, styles[`results__bgItem_${results.back.modifier}`])}>
          <Picture {...results.back}/>
        </div>
        <MouseParallaxContainer
          globalFactorX={0.5}
          globalFactorY={0.5}
          containerStyle={{width: '100vw', height: '100vh', overflow: 'visible'}}
        >
          {results.bgItems.map((item, index)=>{
            return (
              <MouseParallaxChild className={classNames(styles.results__bgItem, styles[`results__bgItem_${item.modifier}`])} 
              key={index} factorX={0.05 + 0.05 * index} factorY={0.05 + 0.1 * index}>
                  <Picture {...item}/>
              </MouseParallaxChild>
            )
          })}
        </MouseParallaxContainer> 
      </div>
      <div className={styles.results__content}>
        <h2 className={styles.results__title}>
          {safeHTML(results.title)}
        </h2>
        <ul className={styles.results__list}>
          {results.resultsList.map((item, index)=>(
            <Result {...item} key={`item-${index}`}/>
          ))}
        </ul> 
        <CustomButton {...results.button} 
          className={classNames(results?.button?.className, styles.results__button, 'customButton_results')}
        />
      </div>
    </section>
  );
}

