import Header from "./header";
import Sidebar from "./sidebar";
import { useStateContext } from "@context/ContextProvider";
import { useEffect } from "react";

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
        <div className={sidebarActive ? "w-full md:mr-72" : "w-full flex-1"}>
          <Header />
        </div>
      </div>
    </div>
  );
};

export default Layout;
