import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import Countdown from "react-countdown";
import style from "./CountdownLine.module.scss";

export default function CountdownLine({className, date = 0, renderer, onComplete}) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <div className={classNames(style.countdownLine)}>
      {render && <Countdown date={date} renderer={renderer} onComplete={onComplete} />}
    </div>
  );
}

CountdownLine.propTypes = {
  className: PropTypes.string,
  date: PropTypes.number,
  onComplete: PropTypes.func,
};
