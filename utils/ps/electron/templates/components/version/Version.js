import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useData} from "../../redux/reducer/data";
import {version} from "./Version.module.scss";
import useOnscreenCodeListener from "../../hooks/useOnscreenCodeListener";

const NO_VERSION = "no version";
const MSK_TIMEZONE = -180;
const TIMEZONE_OFFSET = (MSK_TIMEZONE - new Date().getTimezoneOffset()) * 60 * 1000;

function fix(v, l = 2) {
  return `000${v}`.substr(-l);
}

function toLocaleString(t) {
  const d = new Date(t - TIMEZONE_OFFSET);
  const D = [fix(d.getDate()), fix(d.getMonth() + 1), d.getFullYear()].join(".");
  const T = [d.getHours(), d.getMinutes(), d.getSeconds()].map(v => fix(v)).join(":") + " MSK";
  return `${D} ${T}`;
}

export default function Version() {
  const {isData, data} = useData();
  const [appTimestamp, setAppTimestamp] = useState();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    axios
      .get("/version")
      .then(({data}) => {
        setAppTimestamp(toLocaleString(data * 1000));
      })
      .catch(() => {
        setAppTimestamp(NO_VERSION);
      });
  }, []);

  const isReady = !!((isData === false || data) && appTimestamp && isVisible);

  useEffect(() => {
    if (isReady) {
      const t = setTimeout(() => {
        setIsVisible(false);
      }, 10_000);
      return () => clearTimeout(t);
    }
  }, [isReady]);

  const reset = useCallback(() => {
    setIsVisible(true);
  }, [setIsVisible]);
  useOnscreenCodeListener("lllrrrlrt", reset);

  if (!(isReady && isVisible)) return null;

  const timestamp = data?.timestamp ? toLocaleString(data.timestamp) : NO_VERSION;
  return (
    <div className={version}>
      <div>Приложение:</div>
      <div>{appTimestamp}</div>
      {isData !== false ? (
        <>
          <div>Данные:</div>
          <div>{timestamp}</div>
        </>
      ) : null}
    </div>
  );
}
