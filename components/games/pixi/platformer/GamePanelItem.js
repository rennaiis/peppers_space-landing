import React from "react";
import {useDispatch} from "react-redux";
import user, {useUser} from "../../redux/reducer/user";
import {boosters_system} from "../../constants/game-platform-settings";
// import Button from "../baseComponents/gui/button/Button";
import classNames from "classnames";
import Button from "@/components/baseComponents/gui/button/Button";
import gameStyles from "../../../game/Game.module.scss";

export default function GamePanelItem({image, num, active, disabled, system_name, onActivate}) {
  const dispatch = useDispatch();
  const {profile} = useUser();
  const bonusName = boosters_system[system_name];

  return (
    <Button
      className={classNames("button_panel game__panel-item", {
        "game__panel-item_inactive": !num || (disabled && !active),
        "game__panel-item_visible-inactive": disabled && active,
      })}
      icon={image}
      onClick={() => {
        if (!profile) return;
        dispatch(user.thunks.applyItem(system_name));
        onActivate?.call(null, bonusName);
      }}
    >
      {num ? (
        <div className={"button__icon-num"}>
          <div className={"button__icon-num-block"}>{num}</div>
        </div>
      ) : null}
    </Button>
  );
}
