import React, {useEffect, useRef, useState} from "react";
import CustomButton from "../../../customButton/CustomButton";
import button from "../../../customButton/CustomButton.module.scss";
import CustomProgress from "../customProgress/CustomProgress";
import styles from "./Player.module.scss";
import classNames from "classnames";
import { pauseBut, playBut } from "@/constants/copyright";

const Player = React.forwardRef(function Player({play, isActive, video, audio, iframe, type}, ref) {
  const [isPlay, setIsPlay] = useState(false);
  const [volume, setVolume] = useState(0);
  const [timeLine, setTimeLine] = useState(0);

  const audioRef = useRef();

  const timeRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (play) {
      setTimeout(() => {
        setIsPlay(play);
      }, 200);
    } else {
      setIsPlay(play);
    }
  }, [play]);

  useEffect(() => {
    if (!isActive) setIsPlay(false);
  }, [isActive]);

  useEffect(() => {
    const target = videoRef.current || audioRef.current;

    if (!target) return;

    target.volume = volume;
  }, [volume]);

  useEffect(() => {
    const target = videoRef.current || audioRef.current;

    if (!target) return;

    if (isPlay) target.play();
    else target.pause();
  }, [isPlay]);

  useEffect(() => {
    let isUnmounted;

    const target = videoRef.current || audioRef.current;

    if (!target) return;

    requestAnimationFrame(update);

    return () => {
      isUnmounted = true;
    };

    function update() {
      if (isUnmounted) return;

      const {currentTime, duration} = target;

      const cDate = new Date(currentTime * 1000);
      const dDate = new Date(duration * 1000);

      setTimeLine(currentTime / duration);

      if (timeRef.current)
        timeRef.current.innerHTML = `${String(cDate.getMinutes()).padStart(2, "0")}:${String(
          cDate.getSeconds(),
        ).padStart(2, "0")}/${String(dDate.getMinutes()).padStart(2, "0")}:${String(dDate.getSeconds()).padStart(
          2,
          "0",
        )}`;

      requestAnimationFrame(update);
    }
  }, []);

  useEffect(() => {
    if (audio) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlay]);

  useEffect(() => {
    if (audio) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlay(false);
      });
    }
  }, []);

  return (
    <div
      className={classNames(styles.player, {
        [styles.player_audio]: audio,
      })}
      ref={ref}
    >
      {video && (
        <div className={classNames(styles.player__content)}>
          <video
            key={video}
            ref={videoRef}
            preload={"metadata"}
            src={`${video}`}
            playsInline={true}
            onEnded={() => setIsPlay(false)}
          />
        </div>
      )}
      {iframe && (
        <div className={classNames(styles.player__content)}>
          <iframe src={iframe} frameborder="0" controls className={styles.player__iframe}></iframe>
        </div>
      )}
      {audio && <audio src={audio} style={{display: "none"}} ref={audioRef} />}

      {audio || video && 
      <div className={classNames(styles.player__controls)}>
        <CustomButton
              className={classNames(button.customButton_player, styles.player__button, styles.player__button_play)}
              isIcon={"true"}
              img={
                isPlay
                  ? pauseBut
                  : playBut
              }
              onClick={() => setIsPlay(!isPlay)}
            />
        <div className={classNames(styles.player__line)}>
          <CustomProgress
            progressChanged={progress => {
              const target = videoRef.current || audioRef.current;
              if (!target) return;
              target.currentTime = target.duration * progress;
            }}
            isVertical={false}
            value={timeLine}
          />
        </div>
        <div className={classNames(styles.player__buttons)}>
          <div className={classNames(styles.player__buttonsBlock)}>
            
            {/* <CustomButton
              className={classNames(button.customButton_player, styles.player__button, styles.player__button_stop)}
              isIcon={"true"}
              img={"http://sb.peppers-studio.ru/storybook-images/player/stop.svg"}
              onClick={() => {
                const target = videoRef.current || audioRef.current;
                target.currentTime = 0;
                setIsPlay(false);
              }}
            /> */}
            {/* <CustomButton
              className={classNames(button.customButton_player, styles.player__button, styles.player__button_sound)}
              isIcon={"true"}
              img={
                volume > 0
                  ? "http://sb.peppers-studio.ru/storybook-images/player/soundOn.svg"
                  : "http://sb.peppers-studio.ru/storybook-images/player/soundOff.svg"
              }
              onClick={() => setVolume(!volume)}
            /> */}
            <div className={classNames(styles.player__soundLine)}>
              <CustomProgress
                progressChanged={progress => {
                  setVolume(progress);
                }}
                isVertical={false}
                value={volume}
                hasDot={true}
              />
            </div>
            <div ref={timeRef} className={classNames(styles.player__time)}>
              {"00:00/00:00"}
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
});
export default Player;
Player.propTypes = {};
