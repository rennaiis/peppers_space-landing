import React, {useEffect, useMemo, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./MapBase.module.scss";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

export default function MapBaseBg({className, zoom, setLibraryMapZoom, children, step = 0.5}) {
  const [controller, setController] = useState(null);
  const controls = useMemo(() => ({controller: null, zoom}), []);

  useEffect(() => {
    if (!controller) return;
    if (zoom === controls.zoom) return;

    const currentZoom = controls.controller.state.scale;
    const nextZoom = Math.exp(step) ** zoom;
    const isIn = nextZoom > currentZoom;
    controls.zoom = zoom;
    controller[isIn ? "zoomIn" : "zoomOut"](isIn ? nextZoom - currentZoom : currentZoom - nextZoom, 300, "easeOut");
  }, [zoom, controller]);

  return (
    <div className={classNames(className, styles.mapBase__bg)}>
      <TransformWrapper
        centerOnInit={true}
        smooth={false}
        onZoom={() => {
          controls.zoom = Math.log(controls.controller.state.scale) / Math.log(Math.exp(step));
          setLibraryMapZoom(controls.zoom);
        }}
        onInit={controller => {
          controls.controller = controller;
          setController(controls.controller);
        }}
      >
        {({
          instance: {
            transformState: {scale},
          },
        }) => (
          <TransformComponent wrapperStyle={{width: "100%", height: "100%"}} contentStyle={{height: "100%"}}>
            <div
              className={classNames(styles.mapBase__content)}
              style={{height: "100%", "--scale": `scale(${1 / scale})`}}
            >
              {children}
            </div>
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
}
MapBaseBg.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
