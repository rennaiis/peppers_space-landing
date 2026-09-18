const doTypograf = require("../../utils/typograf");
const processData = require("./processData");

const _doTypograf = processData(
  k => k.charAt(0) === "&",
  (list, key, value) => {
    list[key.substr(1)] = doTypograf(value);
  },
);

module.exports = _doTypograf;
