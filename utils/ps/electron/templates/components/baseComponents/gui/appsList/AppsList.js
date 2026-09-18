import axios from "axios";
import {useState} from "react";
import {baseUrl} from "@/utils/ps/frontend/src/url/baseUrl";
import AppsListInstructions from "./appsListInstruction/AppsListInstructions";
import AppsListItem from "./AppsListItem";
import classNames from "classnames";
import * as styles from "./AppsList.module.scss";

function query(props) {
  return Object.keys(props)
    .reduce((res, key) => {
      if ([undefined, null, false].indexOf(props[key]) >= 0) return res;

      const val = [true, ""].indexOf(props[key]) < 0 ? `=${props[key]}` : "";
      return [...res, `${key}${val}`];
    }, [])
    .join("&");
}

function UpdateButtons({content, buttonType, setIsLoadingAll, onClick, updateAvailable}) {
  const [isLoading, setIsLoading] = useState(false);
  const [logOutput, setLogOutput] = useState("");
  const [logURL, setLogURL] = useState("");

  const updateContent = (api, noApp) => {
    if (Array.isArray(api)) {
      noApp = api[1];
      api = api[0];
    }
    return () => {
      if (!isLoading) {
        setIsLoading(true);
        setIsLoadingAll(true);
        onClick();
        axios
          .get(`/api/${api}?app=${content ? content.id : noApp ? "" : "every"}`)
          .then(({data}) => {
            const {log: id} = data.data;
            return new Promise(resolve => {
              const url = `/api/log?id=${id}`;
              setLogURL(url);
              checkLog();

              function checkLog() {
                axios.get(url).then(({data}) => {
                  setLogOutput(data);
                  if (/DONE/.test(data)) {
                    resolve();
                  } else {
                    setTimeout(checkLog, 3_000);
                  }
                });
              }
            });
          })
          .catch(() => {
            alert("error");
          })
          .then(() => {
            setIsLoading(false);
            setIsLoadingAll(false);
          });
      }
    };
  };
  const BUTTONS = {
    content: [1, "docs", "updater", "обновить контент", "Обновить контент"],
    app: [2, "gear", "deploy-app", "синхронизировать приложение с dev", "Обновить приложение"],
    electron: [3, "blue", "reload", "перезагрузить инсталяцию", "Перезагрузить"],
    all: [4, "white", ["update-app", true], "обновить dev", "Обновить DEV"],
  };

  const buttons = isLoading ? (
    <>{Log(logOutput)}</>
  ) : buttonType === "all" ? (
    Button("all")
  ) : (
    <>
      {Button("content")}
      {Button("app")}
      {Button("electron")}
    </>
  );

  return buttons;

  function Log(logOutput) {
    return (
      <div className={styles["apps-list__log"]}>
        <button className={classNames(styles["apps-list__log-button"], styles["apps-list__button"])}>
          <img className={styles["apps-list__button-image"]} src={baseUrl("/apps-list/icon-update.svg")} alt="" />
          <div className={styles["apps-list__button-text"]}>Обновляется...</div>
        </button>
        <a
          href={logURL}
          target="_blank"
          rel="noreferrer"
          title="Лог последней операции"
          className={styles["apps-list__log-link"]}
        >
          Лог
        </a>

        <div className={styles["apps-list__log-info"]}>
          <div className={styles["apps-list__log-info-wrap"]} dangerouslySetInnerHTML={{__html: logOutput}} />
        </div>
      </div>
    );
  }

  function Button(id) {
    const [index, icon, method, title, text] = BUTTONS[id];
    const test = src => src === true || src?.[id];

    const isEnabled = id === "all" || test(updateAvailable) || test(content.updateAvailable);
    return (
      <button
        // key={index}
        disabled={!isEnabled}
        onClick={updateContent(method)}
        title={title}
        className={classNames(styles["apps-list__button"], styles["apps-list__button_" + index], {
          [styles["apps-list__button_" + buttonType]]: buttonType,
          [styles["apps-list__button_disabled"]]: !isEnabled,
        })}
      >
        <img className={styles["apps-list__button-image"]} src={baseUrl(`/apps-list/icon-update-${icon}.svg`)} alt="" />
        <div className={styles["apps-list__button-text"]}>{text}</div>
      </button>
    );
  }
}

function Anchor({href, className, children}) {
  if (!href) return null;

  return (
    <a href={href} className={styles[className]} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function AppsList({apps, title}) {
  const [isDebug, setIsDebug] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeAll, setActiveAll] = useState(false);

  return (
    <div className={classNames(styles["apps-list"], {[styles["apps-list_loading"]]: isLoading})}>
      <div
        className={styles["apps-list__content"]}
        onScroll={e => {
          const {target, currentTarget} = e;
          if (target !== currentTarget) return;
          target.style.setProperty("--offset", target.scrollTop);
        }}
      >
        <h1 className={styles["apps-list__title"]}>{title}</h1>
        <ol className={styles["apps-list__items"]}>
          {apps.map(
            ({app: {page, number, doc, name, design, search, resolution, cms, updateAvailable}, content}, index) => {
              const _page = !Array.isArray(page) ? [{url: page, name, number, resolution}] : page;
              return (
                <AppsListItem
                  key={"AppsListItem-" + index}
                  index={index}
                  activeIndex={activeIndex}
                  _page={_page}
                  number={number}
                  doc={doc}
                  isDebug={isDebug}
                  search={search}
                  content={content}
                  Anchor={Anchor}
                  UpdateButtons={UpdateButtons}
                  setIsLoading={setIsLoading}
                  setActiveIndex={setActiveIndex}
                  setActiveAll={setActiveAll}
                  query={query}
                  design={design}
                  cms={cms}
                  updateAvailable={updateAvailable}
                />
              );
            },
          )}
        </ol>

        <div className={classNames(styles["apps-list__all"], {[styles["apps-list__all_active"]]: activeAll})}>
          <h4 className={styles["apps-list__all-title"]}>Для всех приложений</h4>
          <div className={styles["apps-list__all-buttons"]}>
            <UpdateButtons
              buttonType={"all"}
              setIsLoadingAll={setIsLoading}
              onClick={() => {
                setActiveAll(true);
              }}
            />
          </div>
        </div>
        <div className={styles["apps-list__debug"]}>
          <label className={styles["apps-list__debug-label"]}>
            <input type={"checkbox"} checked={isDebug} onChange={e => setIsDebug(e.currentTarget.checked)} />
            <div className={styles["apps-list__debug-text"]}>Режим отладки</div>
            <div className={styles["apps-list__debug-box"]} />
          </label>
        </div>
      </div>

      <AppsListInstructions />
    </div>
  );
}
