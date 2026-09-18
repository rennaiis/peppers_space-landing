import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./SafetyCard.module.scss";
import { safeHTML } from "@/utils/ps/frontend";
import Icon from "../baseComponents/gui/icon/Icon";
import Picture from "../baseComponents/gui/picture/Picture";

export default function SafetyCard({img, icon, title, text, modifier, picModifier, icons, isActive}) {
  return (
    <div className={classNames(styles.safetyCard, styles[`safetyCard_${modifier}`], {
      [styles[`safetyCard_isActive`]]: isActive
      })}>
      <div className={styles.safetyCard__head}>
        {title && <h3 className={styles.safetyCard__title}>{safeHTML(title)}</h3>}
        {img && 
          <div className={styles.safetyCard__icon} >
              <Picture {...img}/>
          </div>
        }
        {icon && <Icon name={icon} className={classNames(styles.safetyCard__icon, styles[`safetyCard__icon_${picModifier}`])}/> }
      </div>
      <p className={styles.safetyCard__text}>{safeHTML(text)}</p>
      {icons && 
      <div className={styles.safetyCard__icons}>
        {icons.map((item, index)=>(
          <Icon name={item?.icon} key={`item-${index}`} className={styles.safetyCard__iconsItem}/>
        ))}        
      </div> }
    </div>
  );
}

SafetyCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
