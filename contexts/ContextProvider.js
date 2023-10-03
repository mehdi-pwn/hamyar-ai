import { createContext, useContext, useEffect, useState, useRef } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [navbarActive, setNavbarActive] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [profileBarActive, setProfileBarActive] = useState(false);
  const [themeMode, setThemeMode] = useState("dark");

  const profileBarRef = useRef(null);

  useEffect(() => {
    const closeProfileBar = (e) => {
      if (profileBarRef.current && !profileBarRef.current.contains(e.target)) {
        setProfileBarActive(false);
      }
    };
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", closeProfileBar);

    handleResize();

    return () => {
      window.removeEventListener("mousedown", closeProfileBar);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setMode = (mode) => {
    setThemeMode(mode);
    localStorage.setItem("themeMode", mode);
  };

  return (
    <StateContext.Provider
      value={{
        sidebarActive,
        setSidebarActive,
        navbarActive,
        setNavbarActive,
        screenSize,
        setScreenSize,
        themeMode,
        setThemeMode,
        setMode,
        profileBarActive,
        setProfileBarActive,
        profileBarRef,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
