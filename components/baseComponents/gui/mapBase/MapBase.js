import React, {useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import MapBaseBg from "./MapBaseBg";
import MapBasePoint from "./MapBasePoint";
import Zoom from "../zoom/Zoom";
import styles from "./MapBase.module.scss";

const libraryMap = {
  minZoom: 1,
  maxZoom: 2.42,
};

export default function MapBase({className, list, mapBaseComponent, children}) {
  const [libraryMapZoom, setLibraryMapZoom] = useState(libraryMap.minZoom);

  const items = list?.map(({name, position, ...etc}, index) => (
    <MapBasePoint key={`books-point-${index}`} position={position} name={name} {...etc} />
  ));

  return (
    <div className={classNames(className, styles.mapBase)}>
      <MapBaseBg zoom={libraryMapZoom} setLibraryMapZoom={setLibraryMapZoom}>
        {mapBaseComponent ? mapBaseComponent() : null}
        {items ? <div className={classNames(styles.mapBase__points)}>{items}</div> : null}
        {/*{children}*/}
      </MapBaseBg>
      <Zoom
        className={classNames(styles.mapBase__zoom)}
        setLibraryMapZoom={setLibraryMapZoom}
        libraryMapZoom={libraryMapZoom}
      />
      {/*{children}*/}
    </div>
  );
}
MapBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
