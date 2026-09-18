import React, {Children, cloneElement, isValidElement, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./TiltCard.module.scss";
import {motion, transform, useMotionTemplate, useSpring} from "framer-motion";

export default function TiltCard({
  className,
  classNameContent,
  classNameChildren,
  rotateValue = 30,
  magnet = false,
  showShadow = false,
  glare = false,
  glareColor = "255,255,255",
  glareOpacity = 0.4,
  depth = 1,
  perspective = 1200,
  stiffness = 400,
  damping = 30,
  children,
  style,
}) {
  const [frame, setFrame] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const [glarePos, setGlarePos] = useState({x: 0, y: 0});
  const [_glareOpacity, setGlareOpacity] = useState(0);

  const springValue = {stiffness, damping};

  const rotateX = useSpring(0, springValue);
  const rotateY = useSpring(0, springValue);
  const z = useSpring(1, springValue);

  const shadowX = useSpring(0, springValue);
  const shadowY = useSpring(30, springValue);

  const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0, 0, 68, 0.25))`;

  const convertCursorPosition = e => {
    const objectX = (e.nativeEvent.clientX - frame.left) / frame.width;
    const objectY = (e.nativeEvent.clientY - frame.top) / frame.height;

    const coef = !!magnet ? -1 : 1;

    rotateX.set(transform(objectY, [0, 1], [rotateValue * coef, -rotateValue * coef]));
    rotateY.set(transform(objectX, [0, 1], [-rotateValue * coef, rotateValue * coef]));
    z.set(transform(objectX, [0, 1], [-rotateValue * coef, rotateValue * coef]));

    shadowX.set(transform(objectX, [0, 1], [20, -20]));
    shadowY.set(transform(objectY, [0, 1], [60, 20]));

    if (glare) {
      setGlarePos({x: objectX * 100 * -coef, y: objectY * 100 * -coef});
    }
    setGlareOpacity(1);
  };

  const handleMouseEnter = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    setFrame({
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
    });
    convertCursorPosition(e);
  };

  const handleMouseMove = e => {
    convertCursorPosition(e);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
    shadowX.set(0);
    shadowY.set(40);
    setGlareOpacity(0);
  };

  const renderedChildren = Children.map(children, child => {
    if (!isValidElement(child)) return child;

    const depthValue = parseFloat(child.props["data-depth"] ?? 0);

    const style = {
      ...child.props.style,
      z: depthValue * depth,
      filter: showShadow && filter,
      transformStyle: "preserve-3d",
    };
    const animate = {
      z: depthValue * depth,
    };

    const Tag = motion[`${child.type}`];

    if (child.type && child.type.motion) {
      return cloneElement(child, {
        as: Tag,
        key: child.key || undefined,
        style,
        animate,
      });
    }
    return (
      <Tag
        className={classNames(classNameChildren, child.props.className)}
        style={style}
        animate={animate}
        dataDepth={depthValue}
      >
        {child.props.children}
      </Tag>
    );
  });

  return (
    <motion.div
      className={classNames(styles.tiltCard, className)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        perspective: perspective,
      }}
    >
      <motion.div
        className={classNames(styles.tiltCard__content, classNameContent)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective,
        }}
      >
        {glare && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(${glareColor},${glareOpacity}) 0%, transparent 60%)`,
              pointerEvents: "none",
              zIndex: 1,
              opacity: _glareOpacity,
            }}
          />
        )}
        {renderedChildren}
      </motion.div>
    </motion.div>
  );
}
TiltCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  /**
   * добавить свечение
   */
  glare: PropTypes.bool,
  /**
   * цвет свечения в формате rgb
   */
  glareColor: PropTypes.string,
  /**
   * Полупрозрачность для свечения
   */
  glareOpacity: PropTypes.number,
  /**
   * добавить тень
   */
  showShadow: PropTypes.bool,
  /**
   * магнитить к курсору
   */
  magnet: PropTypes.bool,
  /**
   * максимальный угол наклона
   */
  rotateValue: PropTypes.number,
  /**
   * коэффициент глубины сцены
   */
  depth: PropTypes.number,
  /**
   *  коэффициент перспективы
   */
  perspective: PropTypes.number,
  /**
   * задать жесткость пружины, более высокие значения приведут к более резким движениям.
   */
  stiffness: PropTypes.number,
  /**
   * задать силу споротивления, если значение равно 0, пружина будет колебаться бесконечно.
   */
  damping: PropTypes.number,
};
