import React, {useEffect, useRef, useState} from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Form.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {image} from "@/utils/ps/frontend/src/url/baseUrl";
import Input from "../baseComponents/gui/input/Input";

export default function FormDate({className, input, value, onChange, dateStart, dateEnd, minDate}) {
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    if (value && typeof value === "string") {
      const [day, month, year] = value.split(".");
      const date = new Date(year, month - 1, day);
      if (!isNaN(date)) {
        setSelectedDate(date);
      }
    }
  }, [value]);
  const handleChange = date => {
    if (!date) return;
    if (dateStart && minDate && date <= minDate) {
      date = new Date(minDate);
      date.setDate(date.getDate() + 1);
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    setSelectedDate(date);
    onChange?.(formattedDate);
  };
  return (
    <div className={classNames(styles.form__input, styles.form__input_date)}>
      <div className={classNames(styles.form__inputBorders)}>
        <div className={classNames(styles.form__inputBorder, styles.form__inputBorder_right)} />
        <div className={classNames(styles.form__inputBorder, styles.form__inputBorder_full)} />
        <div className={classNames(styles.form__inputBorder, styles.form__inputBorder_bottom)} />
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        selectsEnd={dateEnd}
        selectsStart={dateStart}
        startDate={dateStart ? selectedDate : minDate}
        endDate={dateEnd ? selectedDate : null}
        calendarIconClassName={styles.form__inputStubImage}
        minDate={minDate || new Date()}
        placeholderText={input?.placeholder}
        dateFormat="dd.MM.yyyy"
        locale={"ru"}
        showYearDropdown
        className={classNames(styles.form__inputBlock)}
        calendarClassName={classNames(styles.form__calendar)}
      />
      <div className={classNames(styles.form__inputStub)}>
        <img src={image("form/date.svg")} className={classNames(styles.form__inputStubImage)} />
      </div>
    </div>
  );
}
FormDate.propTypes = {
  className: PropTypes.string,
};
