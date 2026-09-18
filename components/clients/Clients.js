import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Clients.module.scss";
import ClientsItem from "./ClientsItem";
import CustomButton from "@/components/customButton/CustomButton";
import {useModal} from "@/hooks/useModal";
import SectionAnchor from "../sectionAnchor/SectionAnchor";
import PS from "@PS";
const {image, safeHTML} = PS.frontend;

export default function Clients({className, title, list, button}) {
  const {addModal, closeModal} = useModal();
  const handleOpenModal = () => {
    const {id} = addModal({
      type: "infoModal",
      props: {
        onClose: id => {
          closeModal(id);
        },
      },
    });
  };
  return (
    <section className={classNames(styles.clients, className)}>
      <SectionAnchor id={"clients"} />
      <div className={classNames(styles.clients__container)}>
        <div className={classNames(styles.clients__title)}>
          {safeHTML(title[0])}
          <img src={image(`clients/time.svg`)} className={classNames(styles.clients__titleImage)} />
          {safeHTML(title[1])}
        </div>
        <div className={classNames(styles.clients__gallery, styles.clients__gallery_1)}>
          <div className={classNames(styles.clients__galleryBlock, styles.clients__galleryBlock_1)}>
            <div className={classNames(styles.clients__galleryLine)}>
              {list?.map((item, index) => (
                <ClientsItem key={`ClientsItem-${index}`} index={index} {...item} />
              ))}
            </div>
            <div className={classNames(styles.clients__galleryLine)}>
              {list?.map((item, index) => (
                <ClientsItem key={`ClientsItem-${index}`} index={index} {...item} />
              ))}
            </div>
          </div>
        </div>
        <div className={classNames(styles.clients__gallery, styles.clients__gallery_2)}>
          <div className={classNames(styles.clients__galleryBlock, styles.clients__galleryBlock_2)}>
            <div className={classNames(styles.clients__galleryLine)}>
              {list?.map((item, index) => (
                <ClientsItem key={`ClientsItem-${index}`} index={index} {...item} />
              ))}
            </div>
            <div className={classNames(styles.clients__galleryLine)}>
              {list?.map((item, index) => (
                <ClientsItem key={`ClientsItem-${index}`} index={index} {...item} />
              ))}
            </div>
          </div>
        </div>
        <CustomButton
          {...button}
          className={classNames(styles.clients__button, button.className)}
          onClick={handleOpenModal}
        />
      </div>
    </section>
  );
}
Clients.propTypes = {
  className: PropTypes.string,
};
