import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Form.module.scss";
import FormItem from "./FormItem";
import CustomButton from "../customButton/CustomButton";
import {useDispatch} from "react-redux";
import requests from "@/redux/reducer/requests";
import {reset, useForm} from "@/redux/reducer/form";
import SectionAnchor from "../sectionAnchor/SectionAnchor";
import {formResultContent} from "../../constants/copyright";
import PS from "@PS";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationSwitch} from "@/components/baseComponents/helpers/transition/animations";
import {AnimatePresence} from "framer-motion";

const {image, safeHTML, objToFormData} = PS.frontend;

export default function Form({className, title, subtitle, list, maxDocs}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [blockNextButton, setBlockNextButton] = useState(false);
  const [formData, setFormData] = useState({});
  const [device, setDevice] = useState(null);
  const dispatch = useDispatch();
  const total = list.length;
  const isFormSendSuccess = useForm().isFormSendSuccess;
  const FORM_RESET_TIME = 3000;

  function swiperNav(dir) {
    if (dir === "prev") {
      setActiveIndex(actIndex => (actIndex - 1 > -1 ? actIndex - 1 : 0));
    }
    if (dir === "next") {
      if (activeIndex === total - 1) {
        submitForm();
        setBlockNextButton(true);
      } else {
        setActiveIndex(actIndex => (actIndex + 1 < total ? actIndex + 1 : actIndex));
      }
    }
  }

  useEffect(() => {
    const currentData = list[activeIndex];
    const isEveryFilled = currentData.itemsNameList.every(name => {
      const value = formData[name];
      if (name === "description" || name === "files") {
        const descriptionFilled =
          formData["description"] !== undefined && formData["description"] !== null && formData["description"] !== "";
        const filesFilled = Array.isArray(formData["files"]) && formData["files"].length > 0;
        return descriptionFilled || filesFilled;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== "";
    });

    setBlockNextButton(!isEveryFilled);
  }, [activeIndex, formData, list]);

  const submitForm = () => {
    const formDataToSubmit = objToFormData(formData);
    dispatch(requests.thunks.sendForm(formDataToSubmit));
    const timeoutId = setTimeout(() => {
      setActiveIndex(0);
      setFormData({});
      dispatch(reset());
    }, FORM_RESET_TIME);
    return () => clearTimeout(timeoutId);
  };

  const handleDataChange = (key, value) => {
    setFormData(data => {
      return {...data, [key]: value};
    });
  };

  useEffect(() => {
    let timeout;
    if (isFormSendSuccess !== null) {
      timeout = setTimeout(() => {
        setBlockNextButton(false);
        dispatch(reset());
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isFormSendSuccess]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setDevice("notDesktop");
        return;
      }
      setDevice("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={classNames(styles.form, className, [styles[`form_${activeIndex + 1}`]])}>
      <SectionAnchor id={"form"} />
      <h2 className={classNames(styles.form__title)}>{safeHTML(title)}</h2>
      <div className={classNames(styles.form__navigation)}>
        <div className={classNames(styles.form__navigationTitle)}>{safeHTML(subtitle)}</div>
        <div className={classNames(styles.form__navigationBlock)}>
          {list?.map(({minTitle}, index) => {
            const isDone = activeIndex > index || isFormSendSuccess;
            const isActive = activeIndex === index;
            return (
              <div
                className={classNames(styles.form__point, {
                  [styles.form__point_done]: isDone,
                  [styles.form__point_active]: isActive,
                })}
                key={`form__point-${index}`}
              >
                <PE.div
                  className={classNames(styles.form__pointIndex)}
                  settingsAnimationStates={settingsAnimationSwitch}
                >
                  <PE.img
                    animation={"siteFormPointImage"}
                    animate={isDone ? "show" : "hide"}
                    src={image("form/done.svg")}
                    className={classNames(styles.form__pointIndexImage)}
                  />
                  <PE.div
                    animation={"siteFormPointImage"}
                    animate={!isDone ? "show" : "hide"}
                    className={classNames(styles.form__pointIndexBlock)}
                  >
                    {index + 1}
                  </PE.div>
                </PE.div>
                <div className={classNames(styles.form__pointTitle)}>{minTitle}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classNames(styles.form__block)}>
        <AnimatePresence mode={"wait"}>
          <FormItem
            key={`item-${activeIndex}`}
            {...list[activeIndex]}
            onDataChange={handleDataChange}
            formData={formData}
            maxDocs={maxDocs[device]}
          />
        </AnimatePresence>
      </div>
      <div className={classNames(styles.form__blockNavigation)}>
        <CustomButton
          icon={"buttons/prev"}
          className={`${styles.form__nav} ${styles.form__nav_prev} customButton_nav`}
          onClick={() => swiperNav("prev")}
          disabled={activeIndex === 0}
        />
        <CustomButton
          icon={"buttons/next"}
          className={`${styles.form__nav} ${styles.form__nav_next} customButton_nav ${
            activeIndex === 3 ? "customButton_navFull" : ""
          }`}
          text={"ОТПРАВИТЬ"}
          onClick={() => swiperNav("next")}
          disabled={blockNextButton}
        />
      </div>
      <AnimatePresence mode={"wait"}>
        {isFormSendSuccess !== null && (
          <PE.div
            className={classNames(styles.form__result)}
            animate={isFormSendSuccess !== null ? "show" : "hide"}
            settingsAnimationStates={settingsAnimationSwitch}
            animation={"siteFormResult"}
          >
            <div className={classNames(styles.form__resultBorder, styles.form__resultBorder_right)} />
            <div className={classNames(styles.form__resultBorder, styles.form__resultBorder_full)} />
            <div className={classNames(styles.form__resultBorder, styles.form__resultBorder_bottom)} />
            <div className={classNames(styles.form__resultBlock)}>
              {isFormSendSuccess ? formResultContent.success : formResultContent.fail}
            </div>
          </PE.div>
        )}
      </AnimatePresence>
    </section>
  );
}
Form.propTypes = {
  className: PropTypes.string,
};
