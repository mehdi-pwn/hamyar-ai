import { createContext, useContext, useEffect, useState, useRef } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(true);

  return (
    <StateContext.Provider
      value={{
        sidebarActive,
        setSidebarActive,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
