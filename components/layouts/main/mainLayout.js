import Header from "./header";
import Footer from "./footer";
import { useStateContext } from "@context/ContextProvider";
import { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const { themeMode, setThemeMode } = useStateContext();

  useEffect(() => {
    const localMode = localStorage.getItem("themeMode");
    if (localMode) {
      setThemeMode(localMode);
    }
  }, []);

  return (
    <div className={themeMode == "dark" ? "dark" : "light"}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
