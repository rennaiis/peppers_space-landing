import React, {useContext} from "react";

const PreloaderContext = React.createContext(null);
export default PreloaderContext;

export function usePreloaderContext() {
  return useContext(PreloaderContext);
}
