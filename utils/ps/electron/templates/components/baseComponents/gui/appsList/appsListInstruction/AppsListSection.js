import {useState, useRef, useEffect} from "react";
import {safeHTML} from "@/utils/ps/frontend/src/react/safeHTML";
import AppsListInstructionsItem from "./AppsListInstructionsItem";
import classNames from "classnames";
import * as styles from "./AppsListInstructions.module.scss";
import * as PropTypes from "prop-types";

export default function AppsListSection({
  title,
  content,
  faq,
  info,
  isActiveSection,
  toggleSection,
  activeItemIndex,
  toggleActiveItemIndex,
}) {
  const [contentHeight, setContentHeight] = useState(`${!faq ? 0 : "auto"}`);
  const contentContainer = useRef();

  useEffect(() => {
    if (faq) return;

    if (isActiveSection) {
      setContentHeight(contentContainer.current.offsetHeight);
    } else {
      setContentHeight(0);
    }
  }, [faq, isActiveSection]);

  return (
    <section className={styles["apps-list__section"]}>
      {title ? (
        <button
          className={classNames(styles["apps-list__section-title"], {[styles["apps-list__section-title_info"]]: info})}
          onClick={toggleSection}
        >
          {safeHTML(title)}
          <div
            className={classNames(styles["apps-list__section-button"], {
              [styles["apps-list__section-button_active"]]: isActiveSection,
            })}
          />
        </button>
      ) : null}
      <div className={styles["apps-list__section-block"]} style={{height: `${contentHeight}px`}}>
        <div
          className={classNames(
            styles["apps-list__section-content"],
            {[styles["apps-list__section-content_info"]]: info},
            {[styles["apps-list__section-content_faq"]]: faq},
          )}
          ref={contentContainer}
        >
          {content ? InstructionContentItems(content) : null}
          {faq ? InstructionFaqItem(faq) : null}
          {info ? InstructionInfoItems(info, "info") : null}
        </div>
      </div>
    </section>
  );

  function InstructionInfoItems(items) {
    return items.map(({title, list}, index) => {
      return (
        <div key={index} className={styles["apps-list__instructions-info"]}>
          <div className={styles["apps-list__instructions-info-title"]}>{safeHTML(title)}</div>
          <div className={styles["apps-list__instructions-info-items"]}>{InstructionContentItems(list, "info")}</div>
        </div>
      );
    });
  }

  function InstructionContentItems(items, type) {
    return items.map(({title, text, image}, index) => {
      return (
        <div
          key={index}
          className={classNames(styles["apps-list__instructions-item"], {
            [styles["apps-list__instructions-item_info"]]: type === "info",
          })}
        >
          {title ? <div className={styles["apps-list__instructions-item-title"]}>{safeHTML(title)}</div> : null}
          {text ? <div className={styles["apps-list__instructions-item-text"]}>{safeHTML(text)}</div> : null}
          {image ? <img className={styles["apps-list__instructions-item-text"]} src={image} alt={""} /> : null}
        </div>
      );
    });
  }

  function InstructionFaqItem(items) {
    return items.map(({title, content}, i) => {
      return (
        <AppsListInstructionsItem
          key={"AppsListInstructionsItem-" + i}
          title={title}
          content={content}
          index={i}
          isActiveItem={activeItemIndex === i && isActiveSection}
          toggleActiveItemIndex={() => toggleActiveItemIndex(i)}
        />
      );
    });
  }
}

AppsListSection.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
  faq: PropTypes.array,
  info: PropTypes.array,
  isActiveSection: PropTypes.bool,
  activeItemIndex: PropTypes.number,
  toggleSection: PropTypes.func,
  toggleActiveItemIndex: PropTypes.func,
};
