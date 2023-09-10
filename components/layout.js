import Header from "./header";
import Sidebar from "./sidebar";
import { useStateContext } from "@context/ContextProvider";
import { useEffect } from "react";

//RTL mui support
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "sans-serif", //todo: add vazir
  },
});

const Layout = ({ children }) => {
  const { sidebarActive, setSidebarActive, themeMode, setThemeMode } =
    useStateContext();

  useEffect(() => {
    const localMode = localStorage.getItem("themeMode");
    if (localMode) {
      setThemeMode(localMode);
    }
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={themeMode == "dark" ? "dark" : "light"}>
          <div className="flex relative min-h-screen dark:bg-main bg-light">
            {sidebarActive ? (
              <div className="w-72 h-screen dark:bg-main fixed border-l border-gray-800 z-[9999]">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 h-screen">
                <Sidebar />
              </div>
            )}
            <div
              className={sidebarActive ? "w-full md:mr-72" : "w-full flex-1"}
            >
              <Header />
              <div>{children}</div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Layout;
