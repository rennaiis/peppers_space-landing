import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import CustomModal from "../customModal/CustomModal";
import Button from "../button/Button";
import {useModal} from "@/hooks/useModal";
import styles from "./ErrorHandlerModal.module.scss";

export default function ErrorHandlerModal({className, error, onClose}) {
  const {id} = useModal();
  return (
    <CustomModal>
      <div className={classNames(styles.errorHandlerModal, className)}>
        <div className={styles.errorHandlerModal__bg} />
        <div className={styles.errorHandlerModal__block}>
          <h1 className={styles.errorHandlerModal__title}>Упс, что-то пошло не&nbsp;так</h1>
          <div className={styles.errorHandlerModal__content}>
            <div className={styles.errorHandlerModal__contentItem}>{error?.displayMessage}</div>
          </div>
          <Button
            onClick={() => {
              onClose?.(id);
            }}
          >
            {"Ок"}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
}
ErrorHandlerModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
