import Header from "./header";
import Sidebar from "./sidebar";
import { useStateContext } from "@context/ContextProvider";

const Layout = ({ children }) => {
  const { sidebarActive, setSidebarActive } = useStateContext();
  return (
    <div className="flex relative min-h-screen bg-main">
      {sidebarActive ? (
        <div className="w-72 h-screen bg-main fixed border-l border-gray-800 z-[9999]">
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
  );
};

export default Layout;
