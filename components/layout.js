import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex bg-main">
      <Sidebar />
    </div>
  );
};

export default Layout;
