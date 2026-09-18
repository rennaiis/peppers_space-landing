import React, { useRef } from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Footer.module.scss";
import { footerContent } from "@/constants/copyright";
import Icon from "../icon/Icon";
import Picture from "../picture/Picture";
import { safeHTML } from "@/utils/ps/frontend";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"; 

export default function Footer({className}) {
  const containerRef = useRef(null)
  return (
    <div className={classNames(styles.footer, className)}>
      <div className={styles.footer__bg} ref={containerRef}>
        <MouseParallaxContainer 
          globalFactorX={0.5}
          globalFactorY={0.5}
          containerStyle={{width: '100vw', height: '100vh', overflow: 'visible'}}>
            {footerContent.bgItems.map((item, index)=>{
            return (
              <MouseParallaxChild  key={index} className={classNames(styles.footer__bgItem, styles[`footer__bgItem_${item.modifier}`])} 
              factorX={0.1 + 0.1 * index} factorY={0.1 + 0.1 * index}>
                <Picture {...item}/>
              </MouseParallaxChild>
            )
          })}
        </MouseParallaxContainer>
      </div>
      <div className={styles.footer__content}>
        <div className={styles.footer__left}>
          <Icon name={footerContent.logo} className={styles.footer__logo}/>
          <div className={styles.footer__rules}>
            {footerContent.rules.map((item, index)=>(
              <p key={index}>{safeHTML(item)}</p>
            ))}
          </div>
          <div className={styles.footer__socials}>
            {footerContent.socials.map((item, index)=>(
              <a href={item.href} key={index} target="_blank">
                <Icon name={item.icon} className={styles.footer__social}/>
              </a>
            ))}          
          </div>
        </div>
        <div className={styles.footer__right}>
        <div className={styles.footer__block}>
          <div className={styles.footer__logos}>
          {footerContent.orgsIcons.map((item, index)=>(
            <div key={index} className={styles.footer__logoImg}>
              <Picture {...item}/>
            </div>
          ))}
          </div>
          <p className={styles.footer__orgs}>{safeHTML(footerContent.orgsText)}</p>
        </div>
        <div className={styles.footer__block}>
          <div className={styles.footer__orgsLogos}>
            <Picture {...footerContent.associationsIcon}/>
          </div>
          <div>
            <p className={styles.footer__orgsText}>{safeHTML(footerContent.associationsText)}</p>
            <div  className={styles.footer__asText}>
                {footerContent.associationsCaptions.map((item, index)=>(
                <p key={index}>{safeHTML(item)}</p>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
