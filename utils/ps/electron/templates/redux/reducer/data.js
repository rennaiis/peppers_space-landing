import {getSearch} from "@/utils/ps/frontend/src/window/search";
import {useMemo} from "react";
import {baseUrl} from "@/utils/ps/frontend/src/url/baseUrl";
import {by} from "../../utils/helpers";
import {Builder} from "@/utils/ps/redux/src/Builder";
import axios from "axios";
import {states} from "@/utils/ps/redux/src/constants/constants";

export const search = getSearch();

const builder = new Builder({
  name: "data",
  initialState: {
    loading: states.IDLE,
    isData: null,
    isLoaded: false,
    error: false,
    search,
    debug: typeof search.debug !== "undefined",
  },
  reducers: {
    setNoData: state => {
      state.isLoaded = true;
      state.isData = false;
    },
    updateData(state, {payload}) {
      state.data = Object.entries(payload).reduce(
        (res, [key, value]) => {
          const itm = res.list.find(v => v.title === key);
          if (itm) {
            itm.data = value;
          }
          return res;
        },
        {...state.data},
      );
    },
  },
}).createExtraReducer({
  thunkName: "fetchData",
  saveData(state, action) {
    state.isLoaded = true;
    state.data = action.payload;
    if (Array.isArray(action.payload.config)) {
      state.config = by(action.payload.config, "id");
    }
    state.error = false;
  },
  saveError(state, action) {
    state.error = action.payload;
  },
  func: async function (app) {
    const link = search["data"] || baseUrl(`/content/${app}/data.json`);
    let promise = axios.get(link);

    if (/\/(fake-)?api\//.test(link) || search["modifyData"] === "false") {
      return promise.then(({data}) => modifyApiData(data, link));
    }

    return promise.then(({data}) => {
      return modifyData(data, link);
      // return data;
    });
  },
});
// .createSelector("data", state => state.content);

builder.create();

export const content = builder.export();

export const {fetchData} = content.thunks;
export const {setNoData, updateData} = content.actions;
export const {useData} = content.selectors;

function modifyApiData(data, link) {
  try {
    const folderPath = new URL(link).origin;
    return JSON.parse(JSON.stringify(data).replace(/"(\/uploads\/[^"]+)"/gi, `"${folderPath}$1"`));
  } catch (err) {}
  return data;
}
function modifyData(data, link) {
  const folderPath = link.substring(0, link.lastIndexOf("/") + 1);
  return JSON.parse(JSON.stringify(data).replace(/(images\/[0-9a-f]{64})/gi, `${folderPath}$1`));

  // changeValue(data, link);

  function changeValue(obj) {
    if (typeof obj === "object") {
      for (let keys in obj) {
        if (typeof obj[keys] === "object") {
          changeValue(obj[keys]);
        } else if (["src", "preview"].indexOf(keys) >= 0 && obj[keys]) {
          obj[keys] = `${folderPath}${obj[keys]}`;
        }
      }
    }
    return obj;
  }
}

export function useDataFromTitle(title) {
  const {
    data: {list},
  } = useData();
  return useMemo(() => list.find(item => item.title === title), [list, title]);
}
