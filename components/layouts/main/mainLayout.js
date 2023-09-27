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

  const mainClass = `flex flex-col h-screen ${
    themeMode === "dark" ? "dark" : "light"
  }`;

  return (
    <div className={mainClass}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
