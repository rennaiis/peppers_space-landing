import * as PropTypes from "prop-types";
import classNames from "classnames";
import {useModal} from "@/hooks/useModal";
import GButton from "../gButton/GButton";
import GameDropdown from "../gameDropdown/GameDropdown";
import styles from "./GameNav.module.scss";
import PS from "@PS";
import {AnimatePresence} from "framer-motion";
import {useMemo} from "react";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationBase} from "@/components/baseComponents/helpers/transition/animations";

const {safeHTML, image} = PS.frontend;

export default function GameNav({
  className,
  buttons,
  about,
  counters,
  isHome,
  topButtons,
  dropdown,
  state,
  hero,
  modal,
}) {
  const {addModal} = useModal();

  const content = useMemo(() => {
    switch (state) {
      case "tutorial" || "levels":
        return (
          <PE.div className={styles.gameNav__content} animation={"gameNavAbout"}>
            <GButton img={image("game/buttons/home.svg")} className={"gButton_home"} noBorder={true} />
          </PE.div>
        );
        break;
      case "main":
        return (
          <PE.div animation={"gameNavAbout"} className={classNames(styles.gameNav__about, styles.gameNav__content)}>
            <div className={classNames(styles.gameNav__aboutBg)}>
              <img src={image("game/main/a-bg.png")} className={classNames(styles.gameNav__aboutBgImg)} />
            </div>
            <div className={classNames(styles.gameNav__aboutContent)}>
              <div className={classNames(styles.gameNav__aboutImage)}>
                <img src={about?.img} className={classNames(styles.gameNav__aboutImageImg)} />
              </div>
              <div className={classNames(styles.gameNav__aboutBlock)}>
                <div className={classNames(styles.gameNav__aboutName)}>{safeHTML(about?.name)}</div>
                <div className={classNames(styles.gameNav__aboutLvl)}>
                  {"Ур. "}
                  {safeHTML(about?.lvl)}
                </div>
              </div>
            </div>
          </PE.div>
        );
        break;
      case "games":
        return (
          <PE.div animation={"gameNavAbout"} className={classNames(styles.gameNav__content)}>
            <GameDropdown {...dropdown} />
          </PE.div>
        );
        break;
      case "game":
        return (
          <PE.div animation={"gameNavButtons"} className={classNames(styles.gameNav__buttons, styles.gameNav__content)}>
            {topButtons?.map((item, index) => (
              <GButton
                key={`GButton-top-button-${index}`}
                {...item}
                className={classNames("gButton_home", styles.gameNav__topButton)}
                delay={index}
                onClick={() => {
                  if (item.modal) {
                    addModal({type: item.modal});
                  }
                }}
              />
            ))}
          </PE.div>
        );
        break;
      case "hero":
        return (
          <PE.div className={classNames(styles.gameNav__hero, styles.gameNav__content)} animation={"gameNavHero"}>
            <GButton
              key={`GButton-top-button-hero`}
              onClick={() => addModal({type: "gameFeatureModal", props: {...modal}})}
              {...hero}
            />
          </PE.div>
        );
        break;
      default:
        return <></>;
    }
  }, [state]);

  return (
    <PE.div
      className={classNames(styles.gameNav, className)}
      key={`gameNav-${state}`}
      animation={"fadeSimple"}
      settingsAnimationStates={settingsAnimationBase}
    >
      {counters ? (
        <div className={classNames(styles.gameNav__counters)}>
          {counters?.map(({img, text, more}, index) => (
            <PE.div
              animation={"gameNavCounter"}
              className={classNames(styles.gameNav__counter, {
                [styles[`gameNav__counter_${index + 1}`]]: index + 1,
              })}
              key={`gameNav__counter-${index}`}
            >
              <img src={image("game/main/bg.png")} className={classNames(styles.gameNav__counterBg)} />
              <PE.div className={classNames(styles.gameNav__counterImg)} animation={"gameNavCounterImg"}>
                <img src={img} className={classNames(styles.gameNav__counterImgImage)} />
              </PE.div>
              <PE.div className={classNames(styles.gameNav__counterText)} animation={"gameNavCounterText"}>
                {text}
              </PE.div>
              {more && (
                <PE.div className={classNames(styles.gameNav__counterMore)} animation={"gameNavCounterText"}>
                  {more}
                </PE.div>
              )}
            </PE.div>
          ))}
        </div>
      ) : (
        <span />
      )}
      <PE.div className={classNames(styles.gameNav__block)} animation={"fadeSimple"}>
        <AnimatePresence>{content}</AnimatePresence>
      </PE.div>
    </PE.div>
  );
}
GameNav.propTypes = {
  className: PropTypes.string,
};
