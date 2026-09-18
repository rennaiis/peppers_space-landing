import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./GameInventory.module.scss";
import GameTitle from "../gameTitle/GameTitle";
import {useModal} from "../../../hooks/useModal";
import GameMenu from "../gameMenu/GameMenu";
import PS from "@PS";
import PE from "@/components/baseComponents/gui/pElement/PElement";
import {settingsAnimationBase} from "@/components/baseComponents/helpers/transition/animations";

const {image} = PS.frontend;

function gridAreaCell(list, index, cellSize, centerObjectColumnStart, centerObjectColumnEnd) {
  const count = list.length;
  const half = count * 0.5;
  const n = index + 1;
  let columnStartCell = 1;
  let rowStartCell;

  // Для columnStartCell
  if (n === half) {
    columnStartCell = centerObjectColumnStart;
  } else if (n === half + 1) {
    columnStartCell = centerObjectColumnStart + cellSize;
  } else if (n > half + 1) {
    columnStartCell = centerObjectColumnEnd;
  }

  // Для rowStartCell
  if (n <= half) {
    rowStartCell = n * cellSize - 1;
  } else {
    rowStartCell = count * cellSize - n * cellSize + 1;
  }

  let columnEndCell = columnStartCell + cellSize;
  let rowEndCell = rowStartCell + cellSize;

  return {
    columnStartCell,
    columnEndCell,
    rowStartCell,
    rowEndCell,
  };
}

export default function GameInventory({className, title, list, hero, modal}) {
  const {addModal} = useModal();
  //- для расчета сетки
  const cellSize = 2;
  const centerObjectWidth = cellSize * 2;
  const centerObjectColumnStart = cellSize + 1;
  const centerObjectColumnEnd = centerObjectColumnStart + centerObjectWidth;

  return (
    <div className={classNames(styles.gameInventory, className)}>
      <GameTitle title={title} className={classNames(styles.gameInventory__title)} />
      <PE.div
        className={classNames(styles.gameInventory__block)}
        animation={"gameInventoryBlock"}
        settingsAnimationStates={settingsAnimationBase}
      >
        <img className={classNames(styles.gameInventory__blockBg)} src={image("game/inv/bg.png")} />
        <div className={classNames(styles.gameInventory__border)}>
          <div className={classNames(styles.gameInventory__borderItem, styles.gameInventory__borderItem_top)}>
            <img
              src={image("game/inv/border.png")}
              className={classNames(styles.gameInventory__borderItemBlock, styles.gameInventory__borderItemBlock_top)}
            />
          </div>
          <div className={classNames(styles.gameInventory__borderItem, styles.gameInventory__borderItem_middle)}>
            <img
              src={image("game/inv/border.png")}
              className={classNames(
                styles.gameInventory__borderItemBlock,
                styles.gameInventory__borderItemBlock_middle,
              )}
            />
          </div>
          <div className={classNames(styles.gameInventory__borderItem, styles.gameInventory__borderItem_bottom)}>
            <img
              src={image("game/inv/border.png")}
              className={classNames(
                styles.gameInventory__borderItemBlock,
                styles.gameInventory__borderItemBlock_bottom,
              )}
            />
          </div>
        </div>
        <img className={classNames(styles.gameInventory__person)} src={image("game/inv/person.png")} />
        <PE.div className={classNames(styles.gameInventory__items)} animation={"gameInventoryItems"}>
          {list?.map((item, index) => {
            const {columnStartCell, columnEndCell, rowStartCell, rowEndCell} = gridAreaCell(
              list,
              index,
              2,
              centerObjectColumnStart,
              centerObjectColumnEnd,
            );

            return (
              <PE.div
                animation={"gameInventoryItem"}
                key={`GameInventoryItem-${index}`}
                className={classNames(styles.gameInventory__item, {
                  [styles[`gameInventory__item_${index + 1}`]]: index + 1,
                })}
                onClick={() => {
                  if (item.lvl) {
                    addModal({type: "gameInventoryModal", props: {...modal, ...item}});
                  } else {
                    addModal({type: "gameFeatureModal", props: {...modal}});
                  }
                }}
                style={{
                  [`grid-column`]: `${columnStartCell} / ${columnEndCell}`,
                  [`grid-row`]: `${rowStartCell} / ${rowEndCell}`,
                }}
              >
                <img
                  src={image(`game/inv/border${item.lvl ? "2" : "1"}.png`)}
                  className={classNames(styles.gameInventory__itemBorder)}
                />
                <img src={item.img} className={classNames(styles.gameInventory__itemImage)} />
                {item.lvl && <div className={classNames(styles.gameInventory__itemCounter)}>{item.lvl}</div>}
              </PE.div>
            );
          })}
        </PE.div>
      </PE.div>
      <div className={classNames(styles.gameInventory__footer)} />
      <GameMenu className={classNames(styles.gameInventory__menu)} />
    </div>
  );
}
GameInventory.propTypes = {
  className: PropTypes.string,
};
