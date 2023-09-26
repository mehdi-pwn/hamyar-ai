//RTL mui support
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import { useStateContext } from "@context/ContextProvider";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  direction: "rtl",
  typography: {
    fontFamily:
      "Vazir, sans-serif, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  direction: "rtl",
  typography: {
    fontFamily:
      "Vazir, sans-serif, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
  },
});

const RTL = ({ children }) => {
  const { themeMode } = useStateContext();
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default RTL;
