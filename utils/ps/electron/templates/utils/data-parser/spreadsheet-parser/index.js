const path = require("path");
const {argv} = require("yargs");
const main = require("./main");

let output = argv.output || process.env.OUTPUT;
if (!output) {
  throw new Error("Укажите папку для сохранения данных");
}
output = path.resolve(process.cwd(), output);

const APP = argv.app || process.env.APP;

main(APP, output).catch(console.error);
