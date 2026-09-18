const Typograf = require("typograf");

const typograf = {
  ru: new Typograf({
    locale: ["ru"],
    htmlEntity: {type: "name"},
  }),
  en: new Typograf({
    locale: ["en-US"],
    htmlEntity: {type: "name"},
  }),
};

Object.values(typograf).forEach(typ => {
  typ.disableRule("common/punctuation/quote");
  typ.disableRule("en-US/dash/main");
  typ.disableRule("ru/dash/*");
});

module.exports = function doTypograf(str) {
  return str
    ? typograf[getLang(str)]
        .execute(str)
        .replace(/([а-яА-Я])[ \t]+([IVX]+)(?![- IVX]* век)|([IVX]+) (век)/g, "$1$3&nbsp;$2$4")
    : "";
};

function getLang(str) {
  return /[а-яА-ЯёЁ]/.test(str) ? "ru" : "en";
}
