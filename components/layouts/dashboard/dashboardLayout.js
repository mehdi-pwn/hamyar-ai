import Header from "./header";
import Sidebar from "./sidebar";
import { useStateContext } from "@context/ContextProvider";
import { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const { sidebarActive, setSidebarActive, themeMode, setThemeMode } =
    useStateContext();

  useEffect(() => {
    const localMode = localStorage.getItem("themeMode");
    if (localMode) {
      setThemeMode(localMode);
    }
  }, []);

  return (
    <div className={themeMode == "dark" ? "dark" : "light"}>
      <div className="flex relative min-h-screen dark:bg-dark bg-light">
        {sidebarActive ? (
          <div className="w-72 h-screen bg-[#eceff1] dark:bg-dark fixed border-l border-gray-400 dark:border-gray-800 z-[99999]">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 h-screen">
            <Sidebar />
          </div>
        )}
        <div className={sidebarActive ? "w-full md:mr-72" : "w-full flex-1"}>
          <Header />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
