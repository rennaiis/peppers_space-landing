import React from "react";

export default function GameInputs() {
  return (
    <div className={"game__inputs"}>
      <button data-action={"left"} className={"game__inputs__button"} />
      <button data-action={"right"} className={"game__inputs__button"} />
    </div>
  );
}
