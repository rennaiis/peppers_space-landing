import React, {useCallback, useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import {useModal} from "@/hooks/useModal";
import CustomModal from "@/components/baseComponents/gui/customModal/CustomModal";
import Input from "@/components/baseComponents/gui/input/Input";
import {required} from "@/constants/form";
import CustomButton from "@/components/customButton/CustomButton";
import {InfoModalContent} from "@/constants/copyright";
import styles from "./InfoModal.module.scss";
import Icon from "@/components/baseComponents/gui/icon/Icon";
import Form from "@/components/baseComponents/gui/form/Form";
import {useDispatch} from "react-redux";
import requests, {useRequestData} from "../../redux/reducer/requests";
import {useForm} from "@/redux/reducer/form";
import PS from "@PS";
const {safeHTML, objToFormData} = PS.frontend;

export default function InfoModal({className, onClose}) {
  const {id} = useModal();
  const {title, button} = InfoModalContent;
  const [inputValue, setInputValue] = useState("");
  const close = useCallback(() => {
    onClose({id});
  }, []);

  const action = requests.thunks.sendRequest;
  const requestName = action?.typePrefix ?? "";
  const dispatch = useDispatch();
  const {request} = useRequestData(requestName);
  const clearError = useCallback(
    field =>
      dispatch(
        requests.actions.clearError({
          field,
          requestName,
        }),
      ),
    [action],
  );
  const onSubmit = useCallback(
    data => {
      const formDataToSubmit = objToFormData(data);
      dispatch(action(formDataToSubmit));
    },
    [action],
  );
  const isFormSendSuccess = useForm().isFormSendSuccess;

  useEffect(() => {
    if (isFormSendSuccess) close();
  }, [isFormSendSuccess]);

  return (
    <CustomModal className={classNames(styles.infoModal, "custom-modal_info")}>
      <div className={classNames(styles.infoModal__wrapper, className)}>
        <div className={styles.infoModal__close} onClick={close}>
          <Icon name={"map/add"} />
        </div>
        <div className={styles.infoModal__container}>
          <h3 className={styles.infoModal__title}>{safeHTML(title)}</h3>
          <Form
            className={styles.infoModal__form}
            onSubmit={onSubmit}
            errors={{
              clearError,
              errors: request?.error?.fields,
            }}
          >
            <Input
              name="contact"
              className={classNames(styles.infoModal__input, {
                [styles.infoModal__input_min]: inputValue.length > 30,
              })}
              placeholder={"электронная почта / телеграмм / вотсап"}
              rules={required()}
              autoComplete={"email"}
              onChange={({target}) => setInputValue(target.value)}
            >
              <div className={classNames(styles.infoModal__inputBorder, styles.infoModal__inputBorder_right)} />
              <div className={classNames(styles.infoModal__inputBorder, styles.infoModal__inputBorder_bottom)} />
            </Input>
            <CustomButton {...button} className={classNames(button.className, styles.infoModal__button)} />
          </Form>
        </div>
      </div>
    </CustomModal>
  );
}
InfoModal.propTypes = {
  className: PropTypes.string,
};
