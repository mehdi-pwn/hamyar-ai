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
    <div className={themeMode === "dark" ? "dark" : ""}>
      <div className="flex flex-col min-h-screen dark:bg-dark">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
