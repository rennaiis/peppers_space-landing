import React, {useState} from "react";
import classNames from "classnames";
import GButton from "../gButton/GButton";
import "swiper/css"; // Базовые стили Swiper
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, EffectCoverflow} from "swiper/modules";
import styles from "./GameCreate.module.scss";
import PS from "@PS";

const {
  frontend: {image, safeHTML},
} = PS;

const GameCreateColors = React.forwardRef(function GameCreateColors({color, colors, className}, ref) {
  const [colorIndex, setColorIndex] = useState(0);
  const [colorSwiper, setColorSwiper] = useState();

  const addCustomClasses = swiper => {
    if (!swiper || !swiper.slides || swiper.slides.length === 0) return;

    const slides = Array.from(swiper.slides);
    const originals = slides.filter(s => !s.classList.contains("swiper-slide-duplicate"));
    const total = originals.length || slides.length;

    const real = typeof swiper.realIndex === "number" ? swiper.realIndex : 0;

    const customClasses = [
      "swiper-slide-prev",
      "swiper-slide-prev-prev",
      "swiper-slide-prev-prev-prev",
      "swiper-slide-next",
      "swiper-slide-next-next",
      "swiper-slide-next-next-next",
    ];

    slides.forEach(s => customClasses.forEach(c => s.classList.remove(c)));

    const mod = n => ((n % total) + total) % total;

    const addToRealIndex = (target, className) => {
      let found = false;
      slides.forEach(s => {
        const di = s.getAttribute && s.getAttribute("data-swiper-slide-index");
        if (di !== null && Number(di) === target) {
          s.classList.add(className);
          found = true;
        }
      });
      if (!found && originals[target]) {
        originals[target].classList.add(className);
      }
    };

    addToRealIndex(mod(real - 1), "swiper-slide-prev");
    addToRealIndex(mod(real - 2), "swiper-slide-prev-prev");
    addToRealIndex(mod(real - 3), "swiper-slide-prev-prev-prev");

    addToRealIndex(mod(real + 1), "swiper-slide-next");
    addToRealIndex(mod(real + 2), "swiper-slide-next-next");
    addToRealIndex(mod(real + 3), "swiper-slide-next-next-next");
  };

  return (
    <div className={classNames(styles.gameCreate__colors)}>
      <div className={classNames(styles.gameCreate__colorsTitle)}>{safeHTML(color)}</div>
      <div className={classNames(styles.gameCreate__colorsList)}>
        <div className={classNames(styles.gameCreate__colorsListContainer)}>
          <div className={classNames(styles.gameCreate__colorsListBlock)}>
            <Swiper
              modules={[Navigation, EffectCoverflow]}
              slidesPerView={"auto"}
              centeredSlides={true}
              navigation={{prevEl: ".gameCreate__colorsNav_prev", nextEl: ".gameCreate__colorsNav_next"}}
              onSwiper={swiper => {
                setColorSwiper(swiper);
                addCustomClasses(swiper);
              }}
              onSlideChange={swiper => {
                setColorIndex(swiper.realIndex);
                addCustomClasses(swiper);
              }}
              loop={true}
              slideToClickedSlide={true}
              // allowTouchMove={false}
              // effect={"coverflow"}
              // coverflowEffect={{
              //   rotate: 0,
              //   stretch: -21,
              //   depth: 300,
              //   modifier: 1,
              //   slideShadows: false,
              // }}
            >
              {colors?.map(({color}, index) => (
                <SwiperSlide key={`color-${index}`} className={classNames(styles.gameCreate__colorsItem)}>
                  <div className={classNames(styles.gameCreate__colorslItemImage)} style={{backgroundColor: color}} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={classNames(styles.gameCreate__navs)}>
          <GButton
            className={classNames(
              styles.gameCreate__colorsNav,
              styles.gameCreate__colorsNav_next,
              "gameCreate__colorsNav_next gButton_createNavMin gButton_transparent",
            )}
            img={image("game/buttons/prev.svg")}
            noBorder={true}
          />
          <GButton
            className={classNames(
              styles.gamereate__colorsNav,
              styles.gameCreate__colorsNav_next,
              "gameCreate__colorsNav_next gButton_createNavMin gButton_transparent",
            )}
            img={image("game/buttons/next.svg")}
            noBorder={true}
          />
        </div>
      </div>
      <div className={classNames(styles.gameCreate__colorsCircle)} />
    </div>
  );
});

export default GameCreateColors;
GameCreateColors.propTypes = {};
