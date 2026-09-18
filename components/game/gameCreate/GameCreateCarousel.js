import React, {useEffect, useState} from "react";
import classNames from "classnames";
import GButton from "../gButton/GButton";
import "swiper/css"; // Базовые стили Swiper
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import styles from "./GameCreate.module.scss";
import PS from "@PS";

const {
  frontend: {image},
} = PS;

const GameCreateCarousel = React.forwardRef(function GameCreateCarousel({list, className}, ref) {
  const [index, setIndex] = useState(0);
  const [swiper, setSwiper] = useState();

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(index);
  }, [index]);

  return (
    <div className={classNames(styles.gameCreate__carousel)}>
      <Swiper
        modules={[Navigation]}
        navigation={{prevEl: styles.gameCreate__nav_prev, nextEl: styles.gameCreate__nav_next}}
        onSwiper={swiper => setSwiper(swiper)}
        // loop={true}
        onSlideChange={swiper => setIndex(swiper.realIndex)}
      >
        {list?.map(({img}, index) => (
          <SwiperSlide key={`item-${index}`} className={classNames(styles.gameCreate__carouselItem)}>
            <img src={img} className={classNames(styles.gameCreate__carouselItemImage)} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={classNames(styles.gameCreate__navs)}>
        <GButton
          className={classNames(
            styles.gameCreate__nav,
            styles.gameCreate__nav_next,
            "gButton_createNav gButton_transparent",
          )}
          img={image("game/buttons/prev.svg")}
          noBorder={true}
          disabled={index === 0}
          onClick={() => setIndex(index - 1 > -1 ? index - 1 : index)}
        />
        <GButton
          className={classNames(
            styles.gameCreate__nav,
            styles.gameCreate__nav_next,
            "gButton_createNav gButton_transparent",
          )}
          img={image("game/buttons/next.svg")}
          noBorder={true}
          disabled={index === list.length - 1}
          onClick={() => setIndex(index + 1 < list.length ? index + 1 : index)}
        />
      </div>
    </div>
  );
});

export default GameCreateCarousel;
GameCreateCarousel.propTypes = {};
