import {useState, useRef, useEffect} from "react";
import classNames from "classnames";
import {safeHTML} from "@/utils/ps/frontend/src/react/safeHTML";
import * as styles from "./AppsListInstructions.module.scss";
import * as PropTypes from "prop-types";

export default function AppsListInstructionsItem({title, content, isActiveItem, index, toggleActiveItemIndex}) {
  const [contentBlockHeight, setContentBlockHeight] = useState(0);
  const contentContainer = useRef();

  useEffect(() => {
    if (isActiveItem) {
      setContentBlockHeight(contentContainer.current.offsetHeight);
    } else {
      setContentBlockHeight(0);
    }
  }, [isActiveItem]);

  return (
    <div
      className={classNames(styles["apps-list__faq-item"], styles[`apps-list__faq-item_${index + 1}`], {
        [styles["apps-list__faq-item_active"]]: isActiveItem,
      })}
    >
      <button
        className={classNames(styles["apps-list__faq-item-button"], {
          [styles["apps-list__faq-item-button_active"]]: isActiveItem,
        })}
      />
      {title ? (
        <div className={styles["apps-list__faq-item-title"]} onClick={toggleActiveItemIndex}>
          {safeHTML(title)}
        </div>
      ) : null}
      {content ? (
        <div className={styles["apps-list__faq-item-content"]} style={{height: `${contentBlockHeight}px`}}>
          <div className={styles["apps-list__faq-item-content-block"]} ref={contentContainer}>
            {content.map(instructionFaqItemContent)}
          </div>
        </div>
      ) : null}
    </div>
  );
}

AppsListInstructionsItem.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
  isActiveItem: PropTypes.bool,
  index: PropTypes.number,
  toggleActiveItemIndex: PropTypes.func,
};

function instructionFaqItemContent({title, text, image}, index) {
  if (title) {
    return (
      <div key={index} className={styles["apps-list__faq-item-content-title"]}>
        {safeHTML(title)}
      </div>
    );
  }
  if (image) {
    return <img key={index} className={styles["apps-list__faq-item-content-text"]} src={image} alt={""} />;
  }

  return (
    <div key={index} className={styles["apps-list__faq-item-content-text"]}>
      {safeHTML(text)}
    </div>
  );
}
