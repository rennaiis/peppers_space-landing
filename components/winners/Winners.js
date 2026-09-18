import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./Winners.module.scss";
import { winners } from "@/constants/copyright";
import Carousel from "../baseComponents/gui/carousel/Carousel";
import CustomButton from "../customButton/CustomButton";
import Picture from "../baseComponents/gui/picture/Picture";
import { EffectCoverflow } from "swiper/modules";
import Winner from "../winner/Winner";
import { NOT_MOB } from "@/constants/adaptive-settings";
import Icon from "../baseComponents/gui/icon/Icon";
import { safeHTML } from "@/utils/ps/frontend";
import ParallaxScroll from "../baseComponents/gui/parallaxScroll/ParallaxScroll";
import { Element } from "react-scroll";

export default function Winners() {
  const leftArrowRef = useRef(null)
  const rightArrowRef = useRef(null)
  const {back, bgItems, title, link, winnersList} = winners
  const settings = {
    effect: 'coverflow',
    slidesPerView:'auto',
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      slideShadows: false,
      depth: 400,
      stretch: 0,
    },
    breakpoints: {
      1025:{
        slidesPerView: 'auto',
        coverflowEffect: {
          depth: 307,
          stretch: 0
        },
      }
    },
    
    loop: true,
   
    modules: [EffectCoverflow]
  }
  const containerRef = useRef(null)
  return (
    <section className={styles.winners} id="winners">
      <div className={styles.winners__bg} ref={containerRef}> 
        <div  className={classNames(styles.winners__bgItem, styles[`winners__bgItem_${winners.back.modifier}`])}>
          <Picture {...back} />
        </div>
        {...winners.bgItems.map((item, index)=>{
          return (
            <div key={index} className={classNames(styles.winners__bgItem, styles[`winners__bgItem_${item.modifier}`])}>
              <Picture {...item}/>
            </div>
          )
        })}
      </div>
      <div className={styles.winners__content}>
          <div className={styles.winners__head}>
            <h2 className={styles.winners__title}>
              {safeHTML(title)}
            </h2>
            <a href={link.href} className={styles.winners__link} target="_blank">
              <span href={link.href} className={styles.winners__linkCaption}>{safeHTML(winners.link.text)}</span>
              <Icon name={link.icon} className = {styles.winners__linkArrow} />
            </a>
          </div>
          <div className={styles.winners__container}>
            <div className={styles.winners__carouselContainer}>
              <Carousel 
                  className={styles.winners__carousel}
                  settings={settings}
                  prevRefNavigation={leftArrowRef}
                  nextRefNavigation={rightArrowRef}
                  item = {Winner} 
                  itemsData={winnersList}/>
                <CustomButton ref={leftArrowRef} 
                className={classNames(styles.winners__arrow, styles.winners__arrow_left)}
                icon={winners.leftArrow}
                />
                <CustomButton  
                ref={rightArrowRef} 
                className={classNames(styles.winners__arrow, styles.winners__arrow_right)} 
                icon={winners.rightArrow}/>
            </div>
            <CustomButton {...winners.button} 
              className={classNames(winners?.button?.className, styles.winners__button, 'customButton_winners')}
            />
          </div>
      </div>
    </section>
  );
}

