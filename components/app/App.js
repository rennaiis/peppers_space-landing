import React, { useRef } from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./App.module.scss";
import { app } from "@/constants/copyright";
import SafetyCard from "../safetyCard/SafetyCard";
import Picture from "../baseComponents/gui/picture/Picture";
import { safeHTML } from "@/utils/ps/frontend";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"; 

export default function App() {
  const containerRef = useRef(null)
  return (
    <section className={styles.app} id="app">
      <div className={styles.app__bg} ref={containerRef}>
        <div className={classNames(styles.app__bgItem, styles[`app__bgItem_${app.back.modifier}`])}>
          <Picture {...app.back} />
        </div>
        <div className={classNames(styles.app__bgItem, styles[`app__bgItem_${app.phone.modifier}`])}>
          <Picture {...app.phone} />
        </div>
        <MouseParallaxContainer
          globalFactorX={0.1}
          globalFactorY={0.1}
          containerStyle={{width: '100vw', height: '100vh', overflow: 'visible'}}>
          {app.bgItems.map((item, index)=>{
            return (
              <MouseParallaxChild key={index} className={classNames(styles.app__bgItem, styles[`app__bgItem_${item.modifier}`])} 
               factorX={item.dataDepth} factorY={item.dataDepth}>
                <Picture {...item}/>
              </MouseParallaxChild>
            )
          })}
         </MouseParallaxContainer>
      </div>
      <div className={styles.app__content}>
        <h2 className={styles.app__title}>{safeHTML(app.title)}</h2>
        <div className={styles.app__container}>
          <ul className={styles.app__cardsGrid}>
              {app.cards.map((item)=>(
                <SafetyCard {...item} modifier='app'/>
              ))}
          </ul>
          <ul className={styles.app__appsGrid}>
              {app.apps.map((item, index)=>(
                <a href={item.href} target="_blank" className={styles.app__appCard} key={index}>
                  <Picture {...item.img}/>
                </a>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

App.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
