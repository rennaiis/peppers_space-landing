import React, {useRef} from "react";
import * as PropTypes from "prop-types";
import Scrollbar from "react-scrollbars-custom";
import classNames from "classnames";
import scroll from "./Scroll.module.scss";
import {defaultProps} from "@/constants/scrollbar-settings";

const Scroll = React.forwardRef(function Scroll(
  {mod, update, children, onScroll, resetRef, showShadow = false, ...settings},
  ref,
) {
  const wrapperRef = useRef();
  const shadowTop = useRef(null);
  const shadowBottom = useRef(null);

  function handleUpdate(values) {
    const {scrollTop, scrollHeight, clientHeight} = values;
    if (!showShadow) return;
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity = (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));

    shadowTop.current.style.opacity = shadowTopOpacity;
    shadowBottom.current.style.opacity = shadowBottomOpacity;
    if (showShadow) {
    }
  }

  return (
    <div
      className={classNames("scroll-wrapper", scroll.scrollWrapper, {
        // [`scroll-wrapper_${mod}`]: mod && showShadow,
      })}
      ref={wrapperRef}
    >
      <Scrollbar
        className={scroll.scroll}
        removeTracksWhenNotUsed={true}
        {...defaultProps}
        {...settings}
        onUpdate={handleUpdate}
        onScroll={onScroll}
        ref={resetRef}
      >
        {children}
      </Scrollbar>
      {showShadow && <div ref={shadowTop} className={classNames(scroll.scroll__shadow, scroll.scroll__shadow_top)} />}
      {showShadow && (
        <div ref={shadowBottom} className={classNames(scroll.scroll__shadow, scroll.scroll__shadow_bottom)} />
      )}
    </div>
  );
});
export default Scroll;
Scroll.propTypes = {
  showShadow: PropTypes.bool,
};
