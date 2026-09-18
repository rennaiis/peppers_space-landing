const axios = require("axios");
const {hook: webHookURL, template} = require("./config");
require("./trace");

function sendNotify(message) {
  const data = {text: !template ? message : template.replace(/\{\{message\}\}/g, message)};
  return axios(webHookURL, {
    method: "post",
    headers: {"Content-Type": "application/json; charset=UTF-8"},
    data,
  });
}

/**
 * @param {Error} error
 * @param {string?} msg
 */
function sendNotifyError(error, msg = "") {
  const BEFORE = msg ? `${msg}\n` : "";
  const AFTER = error.stack ? `\n\n${error.stack}` : "";
  const fn = global.__stack[1];
  sendNotify(`${fn.getFileName()}:${fn.getLineNumber()} ${fn.getFunctionName()}\n${BEFORE}${error.message}${AFTER}`);
}

module.exports = {
  sendNotify,
  sendNotifyError,
};
