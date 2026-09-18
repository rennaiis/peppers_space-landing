const {GoogleSpreadsheet} = require("google-spreadsheet");
const serviceAccountKey = {}; // require("./cryptography-318514-9f9b9ea5daef");
console.log("require cryptography context");

const customConsole = require("./utils/customConsole");

async function parse(id, _console = customConsole, find) {
  const doc = new GoogleSpreadsheet(id);
  _console.log("INIT");

  await doc.useServiceAccountAuth(serviceAccountKey);
  await doc.loadInfo();
  _console.log("LOAD INFO");

  const res = {list: []};
  // const promises = [];
  for (let i = 0; i < doc.sheetsByIndex.length; i++) {
    const sheet = doc.sheetsByIndex[i];

    if (sheet.title.charAt(0) === "#") continue;

    await parseSheet(sheet, _console).then(
      (title => {
        return data => {
          _console.log("INSERT DATA");
          switch (title) {
            case "config":
              res.config = data;
              break;
            default:
              res.list.push({title, data});
              break;
          }
        };
      })(sheet.title),
    );
    // const data = await parseSheet(sheet, _console);
    // promises.push(promise);
  }
  // await Promise.all(promises);
  return res;
}

async function parseSheet(sheet, _console) {
  _console.log("LOAD CELLS", sheet.title);
  try {
    await sheet.loadCells();
  } catch (e) {
    _console.log("ERROR", e);
    throw e;
  }

  const headerValues = sheet._cells[0].map(cell => cell.value).filter(n => !!n);
  const result = [];
  const data = Sheet(headerValues);

  _console.log("PARSE CELLS", sheet.title);
  sheet._cells.slice(1).map(row => {
    const _row = row.reduce((res, cell, i) => {
      res[headerValues[i]] = getValue(cell);
      return res;
    }, {});
    data.add(result, _row);
  });
  return result;

  function getValue(cell) {
    if (isDate(cell)) {
      return cell.formattedValue;
    }

    return cell.formula && /=image\(/i.test(cell.formula) ? cell.formula : cell.value;
  }
}

function Sheet(keys, prefix = "") {
  const actions = keys.reduce(
    (res, key) => {
      const _exec = /^\.?([[{])?([^[\]{}.]+)([.}\]])?/.exec(key);
      const [_val, , name, bracket] = _exec;
      let val = bracket === "." ? _val.substr(0, _val.length - 1) : _val;
      const after = key.substr(val.length);

      let item = res.byName[name];
      if (!item) {
        const isArray = bracket === "]";
        const isObject = !!(bracket || after);
        item = {
          isArray,
          isObject,
          key: `${prefix}${val}`,
          name,
          keys: [],
        };
        res.byName[name] = item;
        res.list.push(item);
      }
      res.byKey[key] = item;

      if (after) {
        item.keys.push(after);
      }
      return res;
    },
    {list: [], byName: {}, byKey: {}},
  );

  const {isNew} = actions.list.reduce(
    (res, itm) => {
      if (itm.isObject) {
        itm.sheet = Sheet(itm.keys, itm.key);
      } else {
        res.isNew.push(itm.key);
      }

      return res;
    },
    {isNew: []},
  );

  let instance;
  return {
    add(result, row, forceNew) {
      let _forceNew;
      if (keys.length === 0) {
        if (Array.isArray(result) && !isNull(row[prefix])) {
          result.push(row[prefix]);
        }
      } else {
        if (forceNew || isNew.some(key => row[key]) || !instance) {
          _forceNew = true;
          if (Array.isArray(result)) {
            instance = {};
            result.push(instance);
          } else {
            instance = result;
          }
          actions.list.forEach(itm => {
            let value = null;
            if (itm.isArray) {
              value = [];
            } else if (itm.isObject) {
              value = {};
            } else {
              value = isNull(row[itm.key]) ? "" : row[itm.key];
            }
            instance[itm.name] = value;
          });
        }

        actions.list.forEach(itm => {
          if (itm.sheet) {
            itm.sheet.add(instance[itm.name], row, _forceNew);
          }
        });
      }
    },
  };
}

function isDate(cell) {
  return cell.effectiveFormat && cell.effectiveFormat.numberFormat && cell.effectiveFormat.numberFormat.type === "DATE";
}

function isNull(val) {
  return val === null || typeof val === "undefined" || val === "";
}

module.exports = parse;
