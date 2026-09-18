import React, {useRef, useState} from "react";
import classNames from "classnames";
import GameTutorialItem from "./GameTutorialItem";
import GButton from "../gButton/GButton";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import styles from "./GameTutorial.module.scss";

const GameTutorial = React.forwardRef(function GameTutorial({list, button, logo, img, className}, ref) {
  const [index, setIndex] = useState(0);
  const [swiper, setSwiper] = useState();
  const pagRef = useRef();

  const isLast = index === list?.length - 1;

  const onNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const buttonClick = () => {
    if (!isLast) {
      onNext();
    } else {
    }
  };

  return (
    <div className={classNames(styles.gameTutorial, className)} ref={ref}>
      {list && (
        <div className={classNames(styles.gameTutorial__carousel)}>
          <Swiper
            modules={[Pagination]}
            pagination={{el: pagRef?.current}}
            onSwiper={swiper => setSwiper(swiper)}
            onSlideChange={swiper => setIndex(swiper.realIndex)}
          >
            {list?.map((item, index) => (
              <SwiperSlide key={`item-${index}`}>
                <GameTutorialItem {...item} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          {list && <div className={classNames(styles.gameTutorial__pagination)} ref={pagRef} />}
          <div className={classNames(styles.gameTutorial__buttons)}>
            <GButton onClick={buttonClick} {...button} text={!isLast ? button.text : button.textLast} />
          </div>
        </div>
      )}
    </div>
  );
});

export default GameTutorial;
GameTutorial.propTypes = {};
