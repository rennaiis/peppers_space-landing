import React, {useEffect, useMemo, useRef} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Form.module.scss";
import CustomButton from "../customButton/CustomButton";
import Input from "../baseComponents/gui/input/Input";
import Checkbox from "../baseComponents/gui/checkbox/Checkbox";
import TextAreaInput from "../baseComponents/gui/form/TextAreaInput";
import FormDoc from "./FormDoc";
import FormDate from "./FormDate";
import Icon from "../baseComponents/gui/icon/Icon";
import FileButton from "@/components/form/FileButton";
import PS from "@PS";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationBase} from "@/components/baseComponents/helpers/transition/animations";

const {safeHTML} = PS.frontend;

export default function FormItem({
  className,
  title,
  list,
  input,
  maxDocs,
  button,
  textarea,
  checkbox,
  name,
  date,
  onDataChange,
  index,
  formData,
  ...rest
}) {
  const scrollContainerRef = useRef(null);
  delete rest.minTitle;
  delete rest.itemsNameList;

  const handleInputChange = e => {
    const {value, name} = e.target;
    onDataChange(name, value);
  };

  const handleCheckboxChange = e => {
    const {checked, name} = e.target;
    const code = checked ? 1 : 0;
    onDataChange(name, code);
  };

  const handleListItemClick = (name, code, index) => {
    onDataChange(name, code);
  };
  const currentFiles = useMemo(
    () => (Array.isArray(formData[button?.name]) ? formData[button.name] : []),
    [formData, button?.name],
  );

  const handleDateChange = (field, value) => {
    const splitedDate = value.split(".");
    const year = splitedDate[2];
    const month = splitedDate[1];
    const day = splitedDate[0];
    const date = new Date(year, month - 1, day);
    const seconds = date.getTime() / 1000;
    onDataChange(field, seconds);
    if (field === "start_date" && formData.end_date) {
      const endDate = new Date(formData.end_date * 1000);
      if (date > endDate) {
        const newEndDate = new Date(date);
        newEndDate.setDate(newEndDate.getDate() + 1);
        onDataChange("end_date", newEndDate.getTime() / 1000);
      }
    }
  };

  const handleDocChange = (name, file) => {
    const oldDocs = Array.isArray(formData[button.name]) ? formData[button.name] : [];
    const newDocs = [...oldDocs, file];
    if (currentFiles.some(f => f.name === file.name)) {
      return;
    }
    if (newDocs.length <= maxDocs) {
      onDataChange(name, newDocs);
    }
  };
  const handleDocRemove = fileName => {
    const filteredFiles = currentFiles.filter(file => file.name !== fileName);
    onDataChange(button.name, filteredFiles);
  };
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = e => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel);
    return () => container.removeEventListener("wheel", handleWheel);
  }, [formData[button?.name]]);
  return (
    <PE.div
      className={classNames(styles.form__item, className, [styles[`form__point_${index + 1}`]])}
      {...rest}
      animation={"siteFormItem"}
      settingsAnimationStates={settingsAnimationBase}
    >
      <PE.h2 animation={"siteFormItemTitle"} className={classNames(styles.form__itemTitle)}>
        {safeHTML(title)}
      </PE.h2>
      {list && (
        <PE.div className={classNames(styles.form__itemList)} animation={"siteFormItemList"}>
          {list?.map(({title, code, img}, index) => (
            <PE.div
              animation={"siteFormItemType"}
              className={classNames(styles.form__itemType, {[styles.form__itemType_active]: formData[name] === code})}
              key={`form__item-type-${index}`}
              onClick={() => handleListItemClick(name, code, index)}
            >
              <div className={classNames(styles.form__itemTypeBorders)}>
                <div className={classNames(styles.form__itemTypeBorder, styles.form__itemTypeBorder_right)} />
                <div className={classNames(styles.form__itemTypeBorder, styles.form__itemTypeBorder_full)} />
                <div className={classNames(styles.form__itemTypeBorder, styles.form__itemTypeBorder_bottom)} />
              </div>
              <PE.div className={classNames(styles.form__itemTypeBlock)} animation={"siteFormItemTypeBlock"}>
                <PE.div className={classNames(styles.form__itemTypeImage)} animation={"siteFormITemTypeImage"}>
                  <Icon name={img} />
                </PE.div>
                <PE.div className={classNames(styles.form__itemTypeTitle)} animation={"siteFormITemTypeText"}>
                  {title}
                </PE.div>
              </PE.div>
            </PE.div>
          ))}
        </PE.div>
      )}
      {input && formInput("input", {...input, onChange: handleInputChange, value: formData[input.name] ?? ""})}
      {textarea &&
        formInput("textarea", {...textarea, onChange: handleInputChange, value: formData[textarea.name] ?? ""})}
      {checkbox && (
        <PE.div className={classNames(styles.form__itemCheckbox)} animation={"siteFormItemType"}>
          <Checkbox
            {...checkbox}
            onChange={handleCheckboxChange}
            checked={formData[checkbox.name] === 1 ? true : false}
          />
        </PE.div>
      )}
      {button && (
        <PE.div className={classNames(styles.form__itemFooter)} animation={"siteFormItemList"}>
          {button?.type === "file" ? (
            <PE.div className={classNames(styles.form__buttonContainer)} animation={"siteFormItemType"}>
              <FileButton
                {...button}
                onFileSelect={file => handleDocChange(button.name, file, formData[button.name])}
                disabled={formData.files?.length >= maxDocs}
              />
              <div className={classNames(styles.form__warning)}>
                {safeHTML(`Можно загрузить максимум ${maxDocs}&nbsp;файлов`)}
              </div>
            </PE.div>
          ) : (
            <CustomButton {...button} />
          )}
          {formData[button.name] && (
            <PE.div
              className={classNames(styles.form__itemDocs)}
              ref={scrollContainerRef}
              animation={"siteFormItemType"}
            >
              {formData[button.name]?.map(({name, title}, index) => (
                <FormDoc
                  key={`form__item-doc-${index}`}
                  title={name}
                  index={index}
                  onClose={() => handleDocRemove(name, name)}
                />
              ))}
            </PE.div>
          )}
        </PE.div>
      )}
      {date && (
        <PE.div className={classNames(styles.form__itemDate)} animation={"siteFormItemList"}>
          <PE.div className={classNames(styles.form__itemDateItem)} animation={"siteFormItemType"}>
            <FormDate
              dateStart={true}
              input={date[0]}
              value={formData[date[0].name] ? normalizeDate(new Date(formData[date[0].name] * 1000)) : ""}
              onChange={value => handleDateChange(date[0]?.name, value)}
            />
          </PE.div>
          <PE.div className={classNames(styles.form__itemDateSep)} animation={"siteFormItemType"}>
            <div className={classNames(styles.form__itemDateSepBorders)}>
              <div className={classNames(styles.form__itemDateSepBorder, styles.form__itemDateSepBorder_right)} />
              <div className={classNames(styles.form__itemDateSepBorder, styles.form__itemDateSepBorder_full)} />
              <div className={classNames(styles.form__itemDateSepBorder, styles.form__itemDateSepBorder_bottom)} />
              <div className={classNames(styles.form__itemDateSepBlock)} />
            </div>
          </PE.div>
          <PE.div className={classNames(styles.form__itemDateItem)} animation={"siteFormItemType"}>
            <FormDate
              dateEnd={true}
              minDate={date[1].name === "end_date" && formData.start_date ? new Date(formData.start_date * 1000) : null}
              input={date[1]}
              value={formData[date[1].name] ? normalizeDate(new Date(formData[date[1].name] * 1000)) : ""}
              onChange={value => handleDateChange(date[1]?.name, value)}
            />
          </PE.div>
        </PE.div>
      )}
    </PE.div>
  );

  function formInput(type, input) {
    return (
      <PE.div
        className={classNames(styles.form__input, {[styles.form__input_textarea]: type === "textarea"})}
        animation={"siteFormItemType"}
      >
        <div className={classNames(styles.form__inputBorders)}>
          <div className={classNames(styles.form__inputBorder, styles.form__inputBorder_right)} />
          <div className={classNames(styles.form__inputBorder, styles.form__inputBorder_full)} />
          <div className={classNames(styles.form__inputBorder, styles.form__inputBorder_bottom)} />
        </div>
        <div className={classNames(styles.form__inputBlock)}>
          {type === "textarea" ? <TextAreaInput {...input} /> : <Input {...input} />}
        </div>
      </PE.div>
    );
  }
}

function normalizeDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth();
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  const res = day + "." + month + "." + year;
  return res;
}

FormItem.propTypes = {
  className: PropTypes.string,
  onDataChange: PropTypes.func,
};
