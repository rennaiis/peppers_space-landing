import React from "react";
import classNames from "classnames";
import styles from "./StoriesModal.module.scss";
import {safeHTML} from "@PS/frontend";

const StoriesModalPage = React.forwardRef(function StoriesModalPage(
  {image = "", text = "text", title = "title", background_color = "#ffffff", text_color = "#ffffff"},
  ref,
) {
  return (
    <div
      className={classNames("stories-modal__page", styles.storiesModal__page)}
      ref={ref}
      style={{
        backgroundColor: background_color,
        color: text_color,
      }}
    >
      <div className={classNames("stories-modal__page-image", styles.storiesModal__pageImage)}>
        <img src={image} alt="" />
      </div>
      <div className={classNames("stories-modal__page-content", styles.storiesModal__pageContent)}>
        {title && (
          <div className={classNames("stories-modal__page-title", styles.storiesModal__pageTitle)}>
            {safeHTML(title)}
          </div>
        )}
        {text && (
          <div className={classNames("stories-modal__page-text", styles.storiesModal__pageText)}>{safeHTML(text)}</div>
        )}
      </div>
    </div>
  );
});
export default StoriesModalPage;
StoriesModalPage.propTypes = {};
