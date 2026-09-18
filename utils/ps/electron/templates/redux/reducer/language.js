import {createContext, useCallback, useContext, useMemo, useState} from "react";

export const RUS = {code: "ru", name: "рус"};
export const ENG = {code: "en", name: "eng"};
export const LANG_BY_CODE = [RUS, ENG].reduce((res, itm) => {
  res[itm.code] = itm;
  return res;
}, {});

const CURRENT = RUS;
const AVAILABLE = [RUS, ENG];
const LangContext = createContext({current: CURRENT, available: AVAILABLE});

export default function LangProvider({value, children}) {
  const [current, setCurrent] = useState(value || CURRENT);
  const setLang = useCallback(data => setCurrent(data), []);
  const setLangByCode = useCallback(data => setCurrent(LANG_BY_CODE[data]), []);
  const currentValue = useMemo(
    () => ({
      current,
      available: AVAILABLE,
      setLang,
      setLangByCode,
    }),
    [current, setLang, setLangByCode],
  );

  return <LangContext.Provider value={currentValue}>{children}</LangContext.Provider>;
}

// const langSlice = createSlice({
//   name: "langController",
//   reducers: {
//     setLang(state, data) {
//       state.current = data.payload;
//     },
//     setLangByCode(state, data) {
//       state.current = LANG_BY_CODE[data.payload];
//     }
//   },
//   initialState: {
//     current: RUS,
//     available: [RUS, ENG]
//   }
// });

// export default langSlice.reducer;
// export const {setLang, setLangByCode} = langSlice.actions;

export function useLang() {
  return useContext(LangContext);
}
