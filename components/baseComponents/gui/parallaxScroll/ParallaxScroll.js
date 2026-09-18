import {Children, cloneElement, isValidElement} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./ParallaxScroll.module.scss";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";

function ParallaxScrollItem({child, classNameChildren, scrollYProgress, transformSettings, springSettings}) {
  const depthValue = parseFloat(child.props["data-depth"] ?? 0);

  const depthTransform = useTransform(scrollYProgress, latest => {
    const start = parseFloat(transformSettings[0]);
    const end = parseFloat(transformSettings[1]);
    const range = end - start;
    const value = start + range * latest * depthValue;
    const unit = transformSettings[0].replace(/[0-9.-]/g, "") || "%";

    return `${value}${unit}`;
  });

  const animatedTransform = useSpring(depthTransform, springSettings);
  const style = {
    y: animatedTransform,
  };

  const Tag = motion[`${child.type}`];

  if (child.type && child.type.motion) {
    return cloneElement(child, {
      as: Tag,
      key: child.key || undefined,
      style,
    });
  }

  return (
    <Tag className={classNames(classNameChildren, child.props.className)} style={style}>
      {child.props.children}
    </Tag>
  );
}

export default function ParallaxScroll({
  className,
  classNameChildren,
  containerRef,
  offset = ["start end", "end start"],
  transformSettings = ["-100%", "100%"],
  springSettings = {stiffness: 100, damping: 10},
  children,
}) {
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset,
  });

  const renderedChildren = Children.map(children, child => {
    if (!isValidElement(child)) return child;

    return (
      <ParallaxScrollItem
        child={child}
        classNameChildren={classNameChildren}
        scrollYProgress={scrollYProgress}
        transformSettings={transformSettings}
        springSettings={springSettings}
      />
    );
  });

  return <div className={classNames(styles.parallaxScroll, className)}>{renderedChildren}</div>;
}

ParallaxScroll.propTypes = {
  className: PropTypes.string,
  classNameChildren: PropTypes.string,
  containerRef: PropTypes.object,
  offset: PropTypes.arrayOf(PropTypes.string),
  transformSettings: PropTypes.arrayOf(PropTypes.string),
  springSettings: PropTypes.object,
  children: PropTypes.node,
};

ParallaxScrollItem.propTypes = {
  child: PropTypes.element.isRequired,
  classNameChildren: PropTypes.string,
  scrollYProgress: PropTypes.object.isRequired,
  transformSettings: PropTypes.arrayOf(PropTypes.string).isRequired,
  springSettings: PropTypes.object.isRequired,
};
