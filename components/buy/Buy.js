import React from "react";
import * as PropTypes from "prop-types";
import styles from "./Buy.module.scss";
import { buy, pauseButton } from "@/constants/copyright";
import SafetyCard from "../safetyCard/SafetyCard";
import Carousel from "../baseComponents/gui/carousel/Carousel";
import CustomButton from "../customButton/CustomButton";
import Picture from "../baseComponents/gui/picture/Picture";
import classNames from "classnames";
import { EffectCoverflow, Grid } from "swiper/modules";
import { safeHTML } from "@/utils/ps/frontend";
import { baseConsumers } from "@/utils/ps/core";

export default function Buy({}) {
  const settings = {
    grid: {
      rows: 1,
      fill: 'row'
    },
    effect: 'coverflow',
    loop: true,
    slidesPerView: 1.3,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
    },
    breakpoints: {
      1025:{
        slidesPerView: 2,
        grid: {
          rows: 2,
          fill: 'row'
        },
        effect: 'slide',
        spaceBetween: 10,
        centeredSlides: false,
      }
    },
    modules: [EffectCoverflow, Grid],
  }

  const {video, bgItems, title, img, list, button} = buy;

  return (
    <section className={styles.buy} id="buy">
      <div className={styles.buy__bg}>
       {bgItems.map((item, index)=>{
          return (
            <div key={index} className={classNames(styles.buy__bgItem, styles[`buy__bgItem_${item.modifier}`])}>
              <Picture {...item}/>
            </div>
          )
        })}
      </div>
      <div className={styles.buy__content}>
        <h2 className={styles.buy__title}>{safeHTML(title)}</h2>
        <div className={styles.buy__block}>
          <div className={styles.buy__video}>
            <div className={styles.buy__preview}>
              <Picture {...img}/>
            </div>
            <CustomButton className={styles.buy__pause} img={pauseButton} onClick={()=>baseConsumers.modalOpen({type: "videoModal",props:{videoSrc:video}})}/>
          </div>
          <div className={styles.buy__cardsCarousel}>
            <Carousel 
              settings={settings}
              item={SafetyCard}
              itemsData={list}
              className={styles.buy__carousel}
            />
          </div>
          <div className={styles.buy__button}>
            <CustomButton {...button} 
              className={classNames(buy?.button?.className, styles.winners__button, 'customButton_buy')}
            />
          </div> 
        </div>
        
        
      </div>
    </section>
  );
}

Buy.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};


