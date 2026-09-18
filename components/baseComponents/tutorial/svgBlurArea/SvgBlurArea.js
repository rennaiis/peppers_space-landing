import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import styles from "./SvgBlurArea.module.scss";

const round = 12;

export default function SvgBlurArea({className, style, activeTutorialData, x, y, width, height}) {
  const defaultTime = 0.3;
  const defaultEase = `${defaultTime}s ease-in-out`;
  const opacityTransition = activeTutorialData?.opacityTransition || defaultEase;

  const [bgVisible, setBgVisible] = useState(false);
  const [holeVisible, setHoleVisible] = useState(false);
  const [displayRect, setDisplayRect] = useState({
    x: x || 0,
    y: y || 0,
    width: width || 0,
    height: height || 0,
  });

  const [windowSize, setWindowSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  const [innerPath, setInnerPath] = useState(null);

  const svgRef = useRef();
  const animationTimeoutRef = useRef(null);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    setHoleVisible(!!(width && height));
  }, [width, height]);

  useEffect(() => {
    setBgVisible(!!windowSize.windowWidth);

    setInnerPath(
      getInnerPath(
        0,
        0,
        windowSize.windowWidth,
        windowSize.windowHeight,
        displayRect.x,
        displayRect.y,
        displayRect.width,
        displayRect.height,
        round,
        round,
      ),
    );
  }, [displayRect, windowSize.windowHeight, windowSize.windowWidth]);

  useEffect(() => {
    const hasHole = width && height;

    // первый рендер — без задержки, сразу показываем текущие координаты
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;

      setDisplayRect({
        x: x || 0,
        y: y || 0,
        width: width || 0,
        height: height || 0,
      });
      setHoleVisible(!!hasHole);
      return;
    }

    // очищаем предыдущий таймаут, если вдруг пропсы успели смениться быстрее 0.3s
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // сначала прячем текущую дырку
    setHoleVisible(false);

    // после окончания анимации скрытия применяем новые координаты и показываем заново
    const timeout = setTimeout(() => {
      setDisplayRect({
        x: x || 0,
        y: y || 0,
        width: width || 0,
        height: height || 0,
      });
      setHoleVisible(!!hasHole);
    }, defaultTime * 1000);

    animationTimeoutRef.current = timeout;

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [x, y, width, height]);

  useEffect(() => {
    let requestID;

    const {
      current: {parentNode},
    } = svgRef;

    const size = {
      width: parentNode.clientWidth,
      height: parentNode.clientHeight,
    };

    function checkResize() {
      const current = {
        width: parentNode.clientWidth,
        height: parentNode.clientHeight,
      };

      if (
        current.width !== size.width ||
        current.height !== size.height ||
        current.width !== windowSize.windowHeight ||
        current.height !== windowSize.windowWidth
      ) {
        size.width = current.width;
        size.height = current.height;
        setWindowSize({
          windowWidth: current.width,
          windowHeight: current.height,
        });
      }

      requestID = requestAnimationFrame(checkResize);
    }

    checkResize();
    return () => cancelAnimationFrame(requestID);
  }, []);

  return (
    <>
      <div
        className={styles.svgBlurArea__blur}
        style={{
          maskSize: `100% 100%, ${displayRect.width}px ${displayRect.height}px`,
          maskPosition: `0 0, ${displayRect.x}px ${displayRect.y}px`,
        }}
      />
      <svg
        className={classNames(styles.svgBlurArea, className)}
        viewBox={`0 0 ${windowSize.windowWidth} ${windowSize.windowHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        style={style}
      >
        <defs>
          <mask id="svgBlurAreaMask">
            <rect x="0" y="0" width={windowSize.windowWidth} height={windowSize.windowHeight} fill="white" />
            {innerPath && (
              <path
                d={innerPath}
                fill="black"
                style={{
                  opacity: holeVisible ? 1 : 0,
                  transition: `opacity ${defaultEase}`,
                }}
              />
            )}
          </mask>
        </defs>
        {/* Затемняющий фон (как раньше pathBg), но через mask */}
        <rect
          x="0"
          y="0"
          width={windowSize.windowWidth}
          height={windowSize.windowHeight}
          fill="#002D2D"
          style={{
            opacity: bgVisible ? 0.8 : 0,
            transition: `opacity ${opacityTransition}`,
          }}
          mask="url(#svgBlurAreaMask)"
          className={styles.svgBlurArea__pathBg}
        />
        {/* Обводка той же области, что и дырка */}
        {innerPath && (
          <path
            style={{
              opacity: holeVisible ? 1 : 0,
              transition: `opacity ${defaultEase}`,
            }}
            d={innerPath}
            fill="none"
            stroke="#D6FF18"
            className={styles.svgBlurArea__pathInside}
          />
        )}
      </svg>
    </>
  );
}

function getInnerPath(x, y, width, height, innerX, innerY, innerWidth, innerHeight, rx, ry) {
  return `
    M${innerX + rx} ${innerY}
    H${innerX + innerWidth - rx}
    A${rx} ${ry} 0 0 1 ${innerX + innerWidth} ${innerY + ry}
    V${innerY + innerHeight - ry}
    A${rx} ${ry} 0 0 1 ${innerX + innerWidth - rx} ${innerY + innerHeight}
    H${innerX + rx}
    A${rx} ${ry} 0 0 1 ${innerX} ${innerY + innerHeight - ry}
    V${innerY + ry}
    A${rx} ${ry} 0 0 1 ${innerX + rx} ${innerY}
    Z
  `;
}
