import React, {createContext, useState} from "react";

export const BurgerContext = createContext();

const BurgerProvider = ({children}) => {
  const [burger, setBurger] = useState(false);

  return <BurgerContext.Provider value={{burger, setBurger}}>{children}</BurgerContext.Provider>;
};

export default BurgerProvider;
