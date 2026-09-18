import React, {useState, useEffect, useRef} from "react";
import {safeHTML} from "@/utils/ps/frontend/src/react/safeHTML";
import {baseUrl} from "@/utils/ps/frontend/src/url/baseUrl";
import classNames from "classnames";
import * as styles from "./AppsList.module.scss";

export default function AppsListItem(props) {
  const {index, activeIndex, _page, updateAvailable} = props;
  return (
    <li className={classNames(styles["apps-list__item"], {[styles["apps-list__item_active"]]: index === activeIndex})}>
      {_page.map((info, i, {length}) => {
        return (
          <AppsListItemContent
            key={`apps-list__item-container-${i}`}
            props={props}
            info={info}
            index={i}
            length={length}
            updateAvailable={info.updateAvailable || updateAvailable}
          />
        );
      })}
    </li>
  );
}

function getResolution(v) {
  if (!v) return "";
  return (
    <sup>
      {v[0]}x{v[1]}
    </sup>
  );
}

function AppsListItemContent({
  info: {url, name: _name, number: _number, resolution, params},
  index: i,
  length,
  props: {
    index,
    _page,
    doc,
    isDebug,
    search,
    content,
    Anchor,
    UpdateButtons,
    setIsLoading,
    setActiveIndex,
    setActiveAll,
    query,
    design,
    cms,
  },
  updateAvailable,
}) {
  const [isChangeFont, setIsChangeFont] = useState(false);
  const itemLink = useRef();
  const itemLinkBlock = useRef();

  useEffect(() => {
    if (!itemLinkBlock) return;
    if (itemLinkBlock.current.offsetHeight > itemLink.current.offsetHeight) {
      setIsChangeFont(true);
    } else {
      setIsChangeFont(false);
    }
  }, []);

  let queryString = query({
    app: doc,
    data: cms?.content || content.cms?.content || undefined,
    debug: isDebug,
    ...search,
    ...params,
  });
  if (queryString) queryString = `${url.indexOf("?") < 0 ? "?" : "&"}${queryString}`;

  return (
    <div className={styles["apps-list__item-container"]}>
      <div
        className={classNames(
          styles["apps-list__links"],
          {[styles["apps-list__links_multiline"]]: length > 1},
          {[styles["apps-list__links_min"]]: isChangeFont},
        )}
        ref={itemLink}
      >
        <div className={styles["apps-list__number"]}>
          <div className={styles["apps-list__number-index"]}>{index + 1}</div>
          <div className={styles["apps-list__number-title"]}>{safeHTML(_number || `${i + 1}`)}</div>
        </div>
        <div className={styles["apps-list__link-wrap"]} ref={itemLinkBlock}>
          <a
            className={styles["apps-list__link"]}
            href={/^[0-9a-z]+:\/\//.test(url) ? url : `/${url}${queryString}`}
            key={i}
          >
            {safeHTML(_name.trim() || "-= Без названия =-")}
            {getResolution(resolution)}
          </a>
        </div>
      </div>
      {(content || cms || design) && (
        <>
          <div className={styles["apps-list__info"]}>
            <Anchor className={"apps-list__info-item"} href={design}>
              <img className={styles["apps-list__info-item-image"]} src={baseUrl("/apps-list/logo-figma.svg")} />
              <div className={styles["apps-list__info-item-text"]}>Дизайн</div>
            </Anchor>
            {content || cms ? (
              <Anchor
                href={cms?.url || content.cms?.url || `https://docs.google.com/spreadsheets/d/${content.gid}`}
                className={"apps-list__info-item"}
              >
                <img className={styles["apps-list__info-item-image"]} src={baseUrl("/apps-list/logo-docs.svg")} />
                <div className={styles["apps-list__info-item-text"]}>контент</div>
              </Anchor>
            ) : null}
          </div>
          <div
            className={classNames(styles["apps-list__buttons"], {
              [styles["apps-list__buttons_disabled"]]: !updateAvailable,
            })}
          >
            <UpdateButtons
              content={content}
              setIsLoadingAll={setIsLoading}
              updateAvailable={updateAvailable}
              onClick={() => {
                setActiveIndex(index);
                setActiveAll(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
