import React, {useContext} from "react";

/**
 * @typedef {object} <%-ClassName%>State
 */

/**
 * @typedef {object} <%-ClassName%>Actions
 */

/**
 * @typedef {[<%-ClassName%>State, <%-ClassName%>Actions]} <%-ClassName%>Provider
 */

const <%-ClassName%>Context = React.createContext(/** @type {<%-ClassName%>Provider} */ null);

export function <%-ClassName%>Provider({children}) {
  return (
    <<%-ClassName%>Context.Provider value={null}>
      {children}
    </<%-ClassName%>Context.Provider>
  )
}

export function use<%-ClassName%>Provider() {
  return useContext(<%-ClassName%>Context);
}
