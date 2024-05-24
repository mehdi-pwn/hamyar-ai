import Header from "./header";
import Footer from "./footer";
import { useStateContext } from "@context/ContextProvider";
import { useEffect } from "react";
import Navbar from "./navbar";

const MainLayout = ({ children }) => {
  const { themeMode, setThemeMode, setNavbarActive, navbarActive } =
    useStateContext();

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
        {navbarActive && <Navbar />}
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
