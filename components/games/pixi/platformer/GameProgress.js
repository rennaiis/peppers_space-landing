import React, {useEffect, useState} from "react";

export default function GameProgress({progress = 0}) {
  return (
    <div className={"game__progress"}>
      <div className={"game__progress-block"}>
        <div className={"game__progress-line"} style={{height: `${progress * 100}%`}}>
          <div className={"game__progress-line-bg"} />
          <div className={"game__progress-line-decor"} />
        </div>
      </div>
    </div>
  );
}
