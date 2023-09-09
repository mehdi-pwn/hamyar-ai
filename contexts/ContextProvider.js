import { createContext, useContext, useEffect, useState, useRef } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  return (
    <StateContext.Provider
      value={{
        sidebarActive,
        setSidebarActive,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
