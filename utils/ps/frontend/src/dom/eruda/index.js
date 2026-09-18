import React from "react";
import erudaTrick from "./scripts/erudaTrick.js?raw";
import erudaDefault from "./scripts/erudaDefault.js?raw";
import {baseUrl} from "../../url/baseUrl";

//быстрая проверка на localhost
const TRY = {
  trick: true,
  default: true,
};

export function appendErudaToDom() {
  let inlineScript;

  if (!process.env.LOCALHOST || Object.values(TRY).some(v => !!v)) {
    if (process.env.ERUDA_DEFAULT || TRY.default) inlineScript = erudaDefault;
    if (process.env.ERUDA_TRICK || TRY.trick) inlineScript = erudaTrick;
  }

  if (!inlineScript) return "";

  return (
    <>
      <script src={baseUrl("scripts/eruda.min.js")} nonce="**CSP_NONCE**" />
      <script
        nonce="**CSP_NONCE**"
        dangerouslySetInnerHTML={{
          __html: `(${inlineScript.toString()})()`,
        }}
      />
    </>
  );
}
