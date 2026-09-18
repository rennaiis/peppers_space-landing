import React from "react";
import classNames from "classnames";
import styles from "./Footer.module.scss";
import PS from "@PS";
import CustomButton from "@/components/customButton/CustomButton";
const {safeHTML, image} = PS.frontend;

export default function Footer({links, soc, info, copyright, line}) {
  const copyrightParts = copyright?.split("\n") || [];
  return (
    <footer className={classNames(styles.footer)}>
      <div className={classNames(styles.footer__container)}>
        <div className={classNames(styles.footer__line)}>
          <div className={classNames(styles.footer__lineContainer)}>
            <div className={classNames(styles.footer__lineBlock)}>{lines(10)}</div>
            <div className={classNames(styles.footer__lineBlock)}>{lines(10)}</div>
          </div>
        </div>
        <div className={classNames(styles.footer__block)}>
          <div className={classNames(styles.footer__about)}>
            <div className={classNames(styles.footer__links)}>
              {links?.map((item, index) => (
                <CustomButton
                  key={`CustomButton-link-${index}`}
                  {...item}
                  className={classNames(item.className, styles.footer__linkItem)}
                />
              ))}
            </div>
            <div className={classNames(styles.footer__soc)}>
              {soc?.map((item, index) => (
                <CustomButton key={`CustomButton-soc-${index}`} {...item} />
              ))}
            </div>
          </div>
          <div className={classNames(styles.footer__info)}>
            {info?.map((item, index) => (
              <CustomButton key={`CustomButton-info-${index}`} {...item} />
            ))}
          </div>
          <div className={classNames(styles.footer__right)}>
            <div className={classNames(styles.footer__copyright)}>
              {copyrightParts.map((part, index) => (
                <span className={classNames(styles.footer__copyrightPart)} key={`copyright-part-${index}`}>
                  {safeHTML(part)}
                </span>
              ))}
            </div>
            <img src={image("footer/logo.svg")} className={classNames(styles.footer__logo)} />
          </div>
        </div>
      </div>
    </footer>
  );

  function lines(total) {
    const arr = [];
    for (let i = 0; i < total; i++) {
      arr.push(
        <div
          className={classNames(styles.footer__lineItem, [styles[`footer__lineItem_${i + 1}`]])}
          key={`footer-line-item-${i}`}
        >
          <div className={classNames(styles.footer__lineItemText)}>{line}</div>
          <div className={classNames(styles.footer__lineItemPoint)} />
        </div>,
      );
    }
    return arr;
  }
}
