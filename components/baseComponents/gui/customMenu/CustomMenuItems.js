import CustomMenuItem from "./CustomMenuItem";
import React from "react";

export default function CustomMenuItems({items, show, onClick}) {
  return items.map(({itemsHref, itemsText, link, attr}, index) => {
    return (
      <CustomMenuItem
        key={"custom-menu-item-" + index}
        href={itemsHref}
        text={itemsText}
        {...attr}
        index={index}
        show={show}
        onClick={onClick}
        link = {link}
      />
    );
  });
}
