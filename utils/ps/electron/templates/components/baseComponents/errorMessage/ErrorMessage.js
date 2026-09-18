import React from "react";
import * as PropTypes from "prop-types";
import classes from "./ErrorMessage.module.scss";
import Button from "@/components/baseComponents/gui/button/Button";

const content = {
  title: "Произошла ошибка",
  message: "Сообщение об ошибке отправлено разработчикам.",
  reload: "Перезагрузить",
};

export default function ErrorMessage({title = content.title, message = content.message}) {
  return (
    <div className={classes.errorMessage}>
      <h1>{title}</h1>
      <p>{message}</p>
      <Button onClick={global.location.reload} type={"presentation"}>
        {content.reload}
      </Button>
    </div>
  );
}

ErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};
